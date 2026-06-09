import { IsString, IsEmail, IsOptional, IsEnum, MinLength, MaxLength } from 'class-validator';
import { RolUsuario } from '../../../database/entities/usuario.entity';

export class CrearUsuarioDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(150, { message: 'El nombre no puede exceder 150 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  contrasena: string;

  @IsOptional()
  @IsEnum(RolUsuario, { message: 'Rol inválido' })
  rol?: RolUsuario;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsOptional()
  @IsString()
  direccion?: string;
}
