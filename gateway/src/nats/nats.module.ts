import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { credsAuthenticator } from 'nats';
import { API_SERVICES } from '../utils';

@Global()
@Module({
  providers: [
    {
      provide: API_SERVICES.NATS_SERVICE,
      useFactory: (configService: ConfigService) => {
        const natsOption = configService.get('service.nats');
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            name: 'gateway-service-c',
            servers: [natsOption.server],
            authenticator: credsAuthenticator(
              new TextEncoder().encode(natsOption.credential),
            ),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: API_SERVICES.NATS_AUTH_COMM_SERVICE,
      useFactory: (configService: ConfigService) => {
        const natsOption = configService.get('service.nats_ac');
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            name: 'gateway-auth-com-c',
            servers: [natsOption.server],
            authenticator: credsAuthenticator(
              new TextEncoder().encode(natsOption.credential),
            ),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [API_SERVICES.NATS_SERVICE, API_SERVICES.NATS_AUTH_COMM_SERVICE],
})
export class NatsModule {}
