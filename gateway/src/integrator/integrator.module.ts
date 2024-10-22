import { Module } from '@nestjs/common';
import { IntegratorController } from './integrator.controller';
import { API_SERVICES } from '../utils';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  providers: [
    // {
    //   provide: API_SERVICES.NATS_SERVICE,
    //   useFactory: (configService: ConfigService) => {
    //     const authOptions = configService.get('service.auth');
    //     return ClientProxyFactory.create(authOptions);
    //   },
    //   inject: [ConfigService],
    // },
  ],
  controllers: [IntegratorController],
})
export class IntegratorModule {}
