import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    ],
    preflightContinue: false,
    exposedHeaders: ['Set-Cookie', 'Date', 'ETag'],
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
