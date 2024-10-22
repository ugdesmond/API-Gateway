import { ApiProperty } from '@nestjs/swagger';
import {
  IsEthereumAddress,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateBlockchainDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  chainUrl: string;

  @ApiProperty()
  @IsNumber()
  chainId: number;

  @ApiProperty({
    description: 'The name of the blockchain',
    example: 'Ethereum',
  })
  @IsString()
  @MaxLength(10)
  name: string;

  @ApiProperty({
    description: 'The symbol that represents the blockchain',
    example: 'ETHEREUM',
  })
  @MaxLength(8)
  symbol: string;
}
