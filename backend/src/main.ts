import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const uploadsPath = join(__dirname, '..', 'uploads');
  if (!existsSync(uploadsPath)) {
    mkdirSync(uploadsPath, { recursive: true });
    logger.log(`Directorio uploads creado: ${uploadsPath}`);
  }

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://tienda-kroxi-web.onrender.com',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Aplicación corriendo en puerto ${port}`);
}
bootstrap();
