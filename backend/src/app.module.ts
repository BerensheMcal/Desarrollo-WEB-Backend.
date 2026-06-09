import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ProductosModule } from './modules/productos/productos.module';
import { CarritoModule } from './modules/carrito/carrito.module';
import { OrdenesModule } from './modules/ordenes/ordenes.module';
import { TalleresModule } from './modules/talleres/talleres.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { AuditoriaModule } from './modules/auditoria/auditoria.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { AdminpanelModule } from './adminpanel/adminpanel.module';
import { SeedModule } from './database/seeders/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') === 'development',
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsuariosModule,
    AuthModule,
    CategoriasModule,
    ProductosModule,
    CarritoModule,
    OrdenesModule,
    TalleresModule,
    ReservasModule,
    AuditoriaModule,
    ReportesModule,
    AdminpanelModule,
    SeedModule,
  ],
})
export class AppModule {}
