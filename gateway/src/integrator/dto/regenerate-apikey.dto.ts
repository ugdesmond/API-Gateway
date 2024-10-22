import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class RegenerateApiKeyDto {
  @ApiProperty({ description: 'Business ID' })
  @IsMongoId()
  integratorId: string;
}
