import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class IniciarSesionDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  @MinLength(1, { message: 'La contraseña es requerida' })
  contrasena: string;

  @IsOptional()
  @IsString()
  captchaToken?: string;
}

class CerrarSesionDto {
  @IsOptional()
  @IsString()
  captchaToken?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('iniciar-sesion')
  async iniciarSesion(@Body() dto: IniciarSesionDto, @Req() req: any) {
    return this.authService.iniciarSesion(
      dto.email,
      dto.contrasena,
      req.ip,
      req.headers['user-agent'] || 'Desconocido',
    );
  }

  @Post('cerrar-sesion')
  @UseGuards(JwtAuthGuard)
  async cerrarSesion(@Req() req: any) {
    return this.authService.cerrarSesion(
      req.user.id,
      req.ip,
      req.headers['user-agent'] || 'Desconocido',
    );
  }
}
