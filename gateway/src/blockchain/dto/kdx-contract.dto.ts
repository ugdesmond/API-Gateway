import { ApiProperty } from '@nestjs/swagger';

export class KdxContractDto {
  @ApiProperty()
  network: string;
  
  @ApiProperty()
  address: string;
}
