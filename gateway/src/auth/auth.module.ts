import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { API_SERVICES } from '../utils';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { JwtStrategy } from '../utils/guards/strategies/jwt';
import { HeaderPubApiKeyStrategy } from '../utils/guards/strategies/api-key.pub';
import { HeaderApiKeyStrategy } from '../utils/guards/strategies/api-key.priv';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    // {
    //   provide: API_SERVICES.NATS_SERVICE,
    //   useFactory: (configService: ConfigService) => {
    //     const authOptions = configService.get('service.auth');
    //     return ClientProxyFactory.create(authOptions);
    //   },
    //   inject: [ConfigService],
    // },
    JwtStrategy,
    HeaderPubApiKeyStrategy,
    HeaderApiKeyStrategy,
  ],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return { secret: configService.get<string>('auth.secret') };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
