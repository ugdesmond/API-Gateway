import { Controller, Get, Logger } from '@nestjs/common';
// import { NatsOptions, Transport } from '@nestjs/microservices';
import { ApiExcludeController } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@ApiExcludeController()
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly config: ConfigService,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () =>
      //   this.microservice.pingCheck<NatsOptions>('communication', {
      //     transport: Transport.NATS,
      //     options: {},
      //     // this.config.get('service.nats'),
      //   }),
      // async () =>
      //   this.microservice.pingCheck<NatsOptions>(
      //     'authentication',
      //     this.config.get('service.auth'),
      //   ),
      // async () =>
      //   this.microservice.pingCheck<NatsOptions>(
      //     'payments',
      //     this.config.get('service.payments'),
      //   ),
      // async () =>
      //   this.microservice.pingCheck<NatsOptions>(
      //     'invoice-salary-wallet-collection',
      //     this.config.get('service.iswp'),
      //   ),
      // async () =>
      //   this.microservice.pingCheck<NatsOptions>(
      //     'wallet',
      //     this.config.get('service.wallet'),
      //   ),
      // () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      // async () =>
      //   this.microservice.pingCheck<RedisOptions>('redis', {
      //     transport: Transport.REDIS,
      //     options: {
      //       host: 'localhost',
      //       port: 6379,
      //     },
      //   }),
    ]);
  }
}
