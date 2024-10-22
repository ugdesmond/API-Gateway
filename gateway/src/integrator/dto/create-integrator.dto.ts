import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';
import {
  Base64SizeKB,
  IsBase64,
} from '../../utils/decorators/is-base64.decorator';

export class CreateIntegratorDto {
  @ApiProperty({ description: 'Business name' })
  @IsString()
  businessName: string;

  @ApiProperty({ description: 'Business email', example: 'test@test.com' })
  @IsEmail()
  businessEmail: string;

  @ApiProperty({ description: 'Business logo', required: false })
  @IsOptional()
  @Base64SizeKB(200)
  @IsBase64()
  businessLogo?: string;

  @ApiProperty({ description: 'Business address', required: false })
  @IsOptional()
  @IsString()
  businessAddress: string;

  @ApiProperty({ description: 'Business description', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  employeeSize: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  twitter: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  facebook: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  instagram: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  testWebhook: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  prodWebhook: string;

  @ApiProperty()
  @IsUUID()
  @IsString()
  countryId: string;
}
