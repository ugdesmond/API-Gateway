import { ApiProperty } from '@nestjs/swagger';

export class ApiKeyPayload {
  @ApiProperty({ description: 'API key' })
  apiKey: string;

  @ApiProperty({ description: 'API secret' })
  apiKeySecret: string;

  constructor(integrator: { apiKey: string; apiKeySecret: string }) {
    this.apiKey = integrator.apiKey;
    this.apiKeySecret = integrator.apiKeySecret;
    return this;
  }
}
