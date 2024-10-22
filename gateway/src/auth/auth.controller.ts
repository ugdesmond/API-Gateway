import {
  Body,
  Controller,
  Inject,
  Logger,
  Post
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiExcludeController,
  ApiTags
} from '@nestjs/swagger';
import { RealIP } from 'nestjs-real-ip';
import {
  CustomApiResponse,
  MessageResponse,
} from '../utils/decorators/custom-api-response.decorator';
import { LoginDto } from './request/login.dto';
import { RegisterDto } from './request/register.dto';
import { ResendEmailVerificationDto } from './request/resend-email-verification.dto';
import { TwoFaLoginDto } from './request/twofa-login.dto';

import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';
import { API_SERVICES } from '../utils';
import { TwoFaResendDto } from './request/twofa-resend-token.dto';
import { LoginResPayload } from './response/login.response.dto';

@ApiExcludeController()
@ApiTags('Authentication')
@CustomApiResponse()
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    @Inject(API_SERVICES.NATS_AUTH_COMM_SERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  @Post('email/login')
  @ApiAcceptedResponse({ type: LoginResPayload })
  async login(@Body() loginDto: LoginDto, @RealIP() ip: string) {
    return this.sendToAuthClient('authLoginWithEmail', {
      ipAddress: ip,
      ...loginDto,
    });
  }

  @Post('email/register')
  @ApiAcceptedResponse()
  async register(@Body() registerDto: RegisterDto) {
    return this.sendToAuthClient('authRegisterByEmail', registerDto);
  }

  @Post('email/resend')
  @ApiAcceptedResponse({ type: MessageResponse })
  async resendLink(@Body() resendDto: ResendEmailVerificationDto) {
    return this.sendToAuthClient('authResendVerifEmail', resendDto);
  }

  @Post('twofa/login')
  @ApiAcceptedResponse({ type: LoginResPayload })
  async twoFaLogin(@Body() twoFaDto: TwoFaLoginDto) {
    return this.sendToAuthClient('authLoginWithTwofa', twoFaDto);
  }

  @Post('twofa/resend')
  @ApiAcceptedResponse({ type: LoginResPayload })
  async twoFaResend(@Body() twoFa: TwoFaResendDto) {
    return this.sendToAuthClient('authResendTwofa', twoFa);
  }

  
  private sendToAuthClient(pattern: string, payload: any): Observable<any> {
    return this.authClient.send(pattern, payload).pipe(timeout(5000));
  }
}
