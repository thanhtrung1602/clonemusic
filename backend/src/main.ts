import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  app.setGlobalPrefix('api/v1', { exclude: ['', '/auth/google/return_api'] });
  const optionCors = {
    origin: configService.get<string>('HOST_CLIENT'),
    credentials: true,
  };
  app.enableCors(optionCors);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
