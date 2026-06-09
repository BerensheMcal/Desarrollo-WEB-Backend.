import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const logger = new Logger('Seed');
  const seedService = app.get(SeedService);

  try {
    await seedService.ejecutar();
    logger.log('Seed ejecutado correctamente');
  } catch (error) {
    logger.error('Error al ejecutar seed', error);
  } finally {
    await app.close();
  }
}

bootstrap();
