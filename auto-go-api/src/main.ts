import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({ origin: true, credentials: true });
  app.useStaticAssets(join(__dirname, '..', './uploads/cars'));
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // must be true to allow @Type(() => Date) to work
  }));
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
