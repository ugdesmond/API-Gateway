import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { PageLimit } from '../../utils/dto/page-limit.dto';
import { DateGreater } from '../../utils/decorators/is-date-greater';
import { IsDateInRange } from '../../utils/decorators/is-date-in-range';

enum TransactionType {
  credit = 'credit',
  debit = 'debit',
}
export class LedgerTransactionDto extends PageLimit {
  @ApiProperty({ enum: TransactionType, required: false })
  @IsOptional()
  @IsEnum(TransactionType)
  type: string;

  @ApiProperty({ type: Date, required: false })
  @IsOptional()
  @IsDateString()
  startDate: string;

  @ApiProperty({ type: Date, required: false })
  @ValidateIf((o) => Boolean(o.startDate))
  @IsDateString()
  @DateGreater('startDate', {
    message: 'endDate must be greater than startDate',
  })
  @IsDateInRange('startDate', 3, {
    message: 'Date range must not exceed 3 months',
  })
  endDate: string;
}
