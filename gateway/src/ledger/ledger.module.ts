import { Module } from '@nestjs/common';
import { LedgerController } from './ledger.controller';
import { API_SERVICES } from '../utils';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  providers: [
    // {
    //   provide: API_SERVICES.ISWP_SERVICE,
    //   useFactory: (configService: ConfigService) => {
    //     const authOptions = configService.get('service.iswp');
    //     return ClientProxyFactory.create(authOptions);
    //   },
    //   inject: [ConfigService],
    // },
  ],
  controllers: [LedgerController],
})
export class LedgerModule {}
