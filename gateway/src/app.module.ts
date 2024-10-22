import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { AnonInvoiceModule } from './anon-invoice/anon-invoice.module';
import { AssetModule } from './asset/asset.module';
import { AuthModule } from './auth/auth.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { BulkSenderModule } from './bulk-sender/bulk-sender.module';
import { CollectionsModule } from './collections/collections.module';
import Configuration from './config';
import { CountryModule } from './country/country.module';
import { HealthModule } from './health/health.module';
import { IntegratorModule } from './integrator/integrator.module';
import { InvoiceMeModule } from './invoice-me/invoice-me.module';
import { InvoiceModule } from './invoice/invoice.module';
import { KycModule } from './kyc/kyc.module';
import { LedgerModule } from './ledger/ledger.module';
import { LoggerModule } from './logger/logger.module';
import { NatsModule } from './nats/nats.module';
import { PaymentLinkModule } from './payment-link/payment-link.module';
import { SalaryModule } from './salary/salary.module';
import { DefaultIfEmptyInterceptor } from './utils/interceptors/defaultIfEmpty.interceptor';
import { SlackService } from './utils/loggers/slack/slack.service';
import { WithdrawalModule } from './withdrawal/withdrawal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: Configuration,
      envFilePath: ['.env'],
    }),
    AnonInvoiceModule,
    InvoiceModule,
    SalaryModule,
    IntegratorModule,
    InvoiceMeModule,
    BlockchainModule,
    AssetModule,
    KycModule,
    CountryModule,
    HealthModule,
    LoggerModule,
    AdminModule,
    CollectionsModule,
    PaymentLinkModule,
    AuthModule,
    LedgerModule,
    WithdrawalModule,
    NatsModule,
    BulkSenderModule,
  ],
  controllers: [],
  providers: [
    SlackService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DefaultIfEmptyInterceptor,
    },
  ],
})
export class AppModule {}
