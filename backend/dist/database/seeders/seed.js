"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("../../app.module");
const seed_service_1 = require("./seed.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const logger = new common_1.Logger('Seed');
    const seedService = app.get(seed_service_1.SeedService);
    try {
        await seedService.ejecutar();
        logger.log('Seed ejecutado correctamente');
    }
    catch (error) {
        logger.error('Error al ejecutar seed', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map