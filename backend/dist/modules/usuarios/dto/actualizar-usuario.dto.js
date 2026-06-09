"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualizarUsuarioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const crear_usuario_dto_1 = require("./crear-usuario.dto");
class ActualizarUsuarioDto extends (0, mapped_types_1.PartialType)(crear_usuario_dto_1.CrearUsuarioDto) {
}
exports.ActualizarUsuarioDto = ActualizarUsuarioDto;
//# sourceMappingURL=actualizar-usuario.dto.js.map