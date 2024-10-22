import { ApiProperty } from '@nestjs/swagger';

export class AssetDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  code?: string;
  @ApiProperty()
  decimal?: number;
  @ApiProperty()
  accuracy?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  symbol: string;
  @ApiProperty()
  isCrypto: boolean;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  isActive: boolean;
}
