"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const usuarios_module_1 = require("./modules/usuarios/usuarios.module");
const auth_module_1 = require("./modules/auth/auth.module");
const categorias_module_1 = require("./modules/categorias/categorias.module");
const productos_module_1 = require("./modules/productos/productos.module");
const carrito_module_1 = require("./modules/carrito/carrito.module");
const ordenes_module_1 = require("./modules/ordenes/ordenes.module");
const talleres_module_1 = require("./modules/talleres/talleres.module");
const reservas_module_1 = require("./modules/reservas/reservas.module");
const auditoria_module_1 = require("./modules/auditoria/auditoria.module");
const reportes_module_1 = require("./modules/reportes/reportes.module");
const adminpanel_module_1 = require("./adminpanel/adminpanel.module");
const seed_module_1 = require("./database/seeders/seed.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USERNAME'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_DATABASE'),
                    autoLoadEntities: true,
                    synchronize: config.get('NODE_ENV') === 'development',
                }),
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            usuarios_module_1.UsuariosModule,
            auth_module_1.AuthModule,
            categorias_module_1.CategoriasModule,
            productos_module_1.ProductosModule,
            carrito_module_1.CarritoModule,
            ordenes_module_1.OrdenesModule,
            talleres_module_1.TalleresModule,
            reservas_module_1.ReservasModule,
            auditoria_module_1.AuditoriaModule,
            reportes_module_1.ReportesModule,
            adminpanel_module_1.AdminpanelModule,
            seed_module_1.SeedModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map