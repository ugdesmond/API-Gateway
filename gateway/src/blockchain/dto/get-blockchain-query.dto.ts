import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ModuleTypeEnum, WalletTypeEnum } from '../../types';

export class BlockchainQueryDto {
  @ApiProperty({ minimum: 1, name: 'page', required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page = 1;

  @ApiProperty({ minimum: 1, name: 'limit', required: false, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit = 20;

  @ApiProperty({
    description: 'Module type',
    enum: ModuleTypeEnum,
  })
  @IsEnum(ModuleTypeEnum)
  moduleType: ModuleTypeEnum;

  @ApiProperty({
    description: 'Wallet type',
    enum: WalletTypeEnum,
  })
  @IsEnum(WalletTypeEnum)
  walletType: WalletTypeEnum;
}
