import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { CreateIntegratorDto } from './create-integrator.dto';

export class UpdateIntegratorDto extends PartialType(CreateIntegratorDto) {
  @ApiProperty({ description: 'Business id' })
  @IsMongoId()
  id: string;
}
