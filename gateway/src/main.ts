import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionLoggerFilter } from './utils/filters/http-exception-logger.filter';
import { TransformInterceptor } from './utils/interceptors/transform.interceptor';
import validationOptions from './utils/options/validation.option';
import "reflect-metadata"

function setup(app: NestExpressApplication) {
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableVersioning({ type: VersioningType.URI });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));
  app.useGlobalFilters(new HttpExceptionLoggerFilter())
  app.useLogger(app.get(LoggerService));
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    app.enableCors();
  } else {
    // Configure CORS options for production environment
    // app.enableCors({
    //   origin: /\.konnadex\.com$/,
    //   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    //   allowedHeaders: ['Content-Type', 'Authorization'],
    // });
    app.enableCors();
  }

  setup(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Started Gateway on port ${port}`);
}
bootstrap();
