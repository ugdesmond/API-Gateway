import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BlockchainDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  chainUrl?: string;

  @ApiProperty()
  chainId?: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  contractAddress: string;
  
  @ApiProperty()
  isActive: boolean;
}
