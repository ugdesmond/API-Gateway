import { ApiProperty } from '@nestjs/swagger';
import { AnalyticsGroupEnum } from '../../types';
import { IsEnum, IsMongoId } from 'class-validator';

export class TransactionStatsDto {
  @ApiProperty()
  @IsMongoId()
  integratorId: string;
  
  @ApiProperty({ enum: AnalyticsGroupEnum })
  @IsEnum(AnalyticsGroupEnum)
  groupBy: AnalyticsGroupEnum;
}
