import { IsString, IsNumber, IsOptional, Min, MinLength, MaxLength, IsPositive } from 'class-validator';

export class CrearProductoDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  nombre!: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  descripcion?: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio!: number;

  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock!: number;

  @IsOptional()
  @IsNumber({}, { message: 'La categoría no es válida' })
  categoriaId?: number;
}
/* VALI */
