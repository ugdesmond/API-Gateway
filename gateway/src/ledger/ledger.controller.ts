import {
  Controller,
  Get,
  Inject,
  Param,
  Req,
  UseGuards,
  Request,
  Query,
  ParseEnumPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { timeout } from 'rxjs';
import { API_SERVICES } from '../utils';
import { JwtGuard } from '../utils/guards/jwt.guard';
import { LedgerTransactionDto } from './dto/ledger-transaction.dto';
import { isMongoId } from 'class-validator';
import { BadRequestError } from '../utils/exceptions';
import { AnalyticsGroupEnum, AssetCodeEnum } from '../types';
import { TransactionStatsDto } from './dto/transaction-stats.dto';

@ApiTags('Ledger Account')
@ApiBearerAuth()
@Controller({ path: 'ledger', version: '1' })
export class LedgerController {
  private readonly ttl = 5000;
  constructor(
    @Inject(API_SERVICES.NATS_SERVICE)
    private readonly iswp: ClientProxy,
  ) {}

  @Get(':integratorId')
  @UseGuards(JwtGuard)
  getIntegratorLedger(
    @Req() req: Request,
    @Param('integratorId') integratorId: string,
  ) {
    if (!isMongoId(integratorId)) {
      throw new BadRequestError('integratorId must be a mongoId');
    }
    const userId = (req as any).user.id;
    return this.iswp
      .send('iswpFindIntegratorLedger', { integratorId, userId })
      .pipe(timeout(this.ttl));
  }

  @Get()
  @UseGuards(JwtGuard)
  getUserLedger(@Req() req: Request) {
    const userId = (req as any).user.id;
    return this.iswp
      .send('iswpFindUserLedger', { userId })
      .pipe(timeout(this.ttl));
  }

  @Get(':integratorId/transactions')
  @UseGuards(JwtGuard)
  getLedgerTransaction(
    @Param('integratorId') integratorId: string,
    @Query() dto: LedgerTransactionDto,
  ) {
    if (!isMongoId(integratorId)) {
      throw new BadRequestError('integratorId must be a mongoId');
    }

    return this.iswp
      .send('iswpGetLedgerTransactions', { integratorId, ...dto })
      .pipe(timeout(this.ttl));
  }
  @Get('cron-wallet-create/cron')
  runWalletCreationOp(@Req() req: Request) {
    return this.iswp
      .send('iswpCreateLedgerWalletAddressCron', {})
      .pipe(timeout(this.ttl));
  }
  @Get('cron-deposit-check/cron')
  runDepositCheckOp() {
    return this.iswp
      .emit('paymentDepositCheckCron', {})
      .pipe(timeout(this.ttl));
  }
  @Get(':assetId/analytics')
  @UseGuards(JwtGuard)
  @ApiParam({ name: 'assetId', enum: AssetCodeEnum })
  getTransactionAnalytics(
    @Param('assetId', new ParseEnumPipe(AssetCodeEnum)) assetId: AssetCodeEnum,
    @Query() query: TransactionStatsDto,
  ) {
    return this.iswp
      .send('iswpGetLedgerTransactionsAnalytics', { assetId, ...query })
      .pipe(timeout(this.ttl));
  }
}
