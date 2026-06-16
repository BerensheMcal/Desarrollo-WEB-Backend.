import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { EventoAuditoria } from '../../database/entities/registro-auditoria.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async validarUsuario(email: string, contrasena: string): Promise<any> {
    const usuario = await this.usuariosService.buscarPorEmail(email);
    if (!usuario) return null;
    const coinciden = await bcrypt.compare(contrasena, usuario.contrasenaHash);
    if (!coinciden) return null;
    return usuario;
  }

  async iniciarSesion(email: string, contrasena: string, ip: string, navegador: string) {
    const usuario = await this.validarUsuario(email, contrasena);

    if (!usuario) {
      await this.auditoriaService.registrar({
        usuarioId: null,
        emailIntentado: email,
        direccionIp: ip,
        evento: EventoAuditoria.INGRESO_FALLIDO,/*    F  ACC  */
        navegador,
      });
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre,
    };

    await this.auditoriaService.registrar({
      usuarioId: usuario.id,
      emailIntentado: email,
      direccionIp: ip,
      evento: EventoAuditoria.INGRESO_EXITOSO,
      navegador,
    });

    return {
      token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }

  async cerrarSesion(usuarioId: number, ip: string, navegador: string) {
    await this.auditoriaService.registrar({
      usuarioId,
      emailIntentado: null,
      direccionIp: ip,
      evento: EventoAuditoria.CIERRE_SESION,
      navegador,
    });
    return { mensaje: 'Sesión cerrada correctamente' };
  }
}
