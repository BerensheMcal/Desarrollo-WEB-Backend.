import { IsString, IsNumber, IsOptional, IsDateString, Min, MinLength, MaxLength, IsPositive } from 'class-validator';

export class CrearTallerDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  descripcion?: string;

  @IsDateString({}, { message: 'Fecha de inicio inválida' })
  fechaInicio: string;

  @IsDateString({}, { message: 'Fecha de fin inválida' })
  fechaFin: string;

  @IsOptional()
  horaInicio?: string;

  @IsOptional()
  horaFin?: string;

  @IsNumber({}, { message: 'Los cupos máximos deben ser un número' })
  @Min(1, { message: 'Debe haber al menos 1 cupo' })
  cuposMaximos: number;

  @IsOptional()
  @IsNumber({}, { message: 'Los cupos disponibles deben ser un número' })
  @Min(0, { message: 'Los cupos disponibles no pueden ser negativos' })
  cuposDisponibles?: number;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio: number;

  @IsOptional()
  @IsString({ message: 'La ubicación debe ser texto' })
  ubicacion?: string;
}
