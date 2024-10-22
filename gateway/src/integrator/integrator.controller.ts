import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { ClientProxy } from '@nestjs/microservices';
import { isMongoId } from 'class-validator';
import { RoleEnum } from '../types';
import { API_SERVICES } from '../utils';
import {
  CustomApiResponse,
  MessageResponse,
} from '../utils/decorators/custom-api-response.decorator';
import { Roles } from '../utils/decorators/roles.decorator';
import { BadRequestError } from '../utils/exceptions';
import { JwtGuard } from '../utils/guards/jwt.guard';
import { RolesGuard } from '../utils/guards/roles.guard';
import { ApiKeyPayload } from './dto/api-key-payload.dto';
import { CreateIntegratorDto } from './dto/create-integrator.dto';
import { RegenerateApiKeyDto } from './dto/regenerate-apikey.dto';
import { UpdateIntegratorDto } from './dto/update-integrator.dto';

@ApiTags('Integrator')
@Controller({ path: 'integrator', version: '1' })
@CustomApiResponse()
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class IntegratorController {
  constructor(
    @Inject(API_SERVICES.NATS_AUTH_COMM_SERVICE)
    private readonly serviceClient: ClientProxy,
  ) {}

  @Post('apiKey/regenerate')
  @Roles(RoleEnum.INTEGRATOR)
  @ApiAcceptedResponse({ type: ApiKeyPayload })
  async generateAPIkey(
    @Body() regenerateDto: RegenerateApiKeyDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;
    return this.serviceClient.send('authRevokeIntegratorApikey', {
      userId,
      ...regenerateDto,
    });
  }

  @Get('apiKey/retrieve/:integratorId')
  @ApiOkResponse({ type: ApiKeyPayload })
  async getApiKey(
    @Param('integratorId') integratorId: string,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;
    return this.serviceClient.send('authGetApikeyByIntegratorId', {
      userId,
      integratorId,
    });
  }

  @Post('create')
  @ApiOkResponse({ type: CreateIntegratorDto })
  async addBusiness(
    @Body() businessDto: CreateIntegratorDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;

    return this.serviceClient.send('authCreateIntegrator', {
      userId,
      ...businessDto,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: CreateIntegratorDto })
  async getUserBusiness(@Param('id') id: string, @Req() req: Request) {
    if (!isMongoId(id)) throw new BadRequestError('Invalid id');
    const userId = (req as any).user.id;
    return this.serviceClient.send('authFindIntegratorById', {
      userId,
      integratorId: id,
    });
  }

  @Get()
  @ApiOkResponse({ type: CreateIntegratorDto, isArray: true })
  async getAllUserBusiness(@Req() req: Request) {
    const userId = (req as any).user.id;
    return this.serviceClient.send('authFindAllUserIntegrators', userId);
  }

  @Patch()
  @ApiOkResponse({ type: MessageResponse })
  async updateIntegrator(
    @Body() updateDto: UpdateIntegratorDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;
    return this.serviceClient.send('authUpdateIntegrator', {
      userId,
      ...updateDto,
    });
  }
}
