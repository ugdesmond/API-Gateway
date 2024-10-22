import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { API_SERVICES } from '../utils';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    // {
      
    //   provide: API_SERVICES.NATS_SERVICE,
    //   useFactory: (configService: ConfigService) => {
    //     const authOptions = configService.get('service.iswp');
    //     return ClientProxyFactory.create(authOptions);
    //   },
      
    //   inject: [ConfigService],
    // },
  ],
  controllers: [BlockchainController],
})
export class BlockchainModule {}
