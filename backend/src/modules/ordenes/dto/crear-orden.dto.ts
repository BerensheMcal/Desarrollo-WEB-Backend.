import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ItemOrdenDto {
  @IsNumber({}, { message: 'El ID del producto debe ser un número' })
  productoId: number;

  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(1, { message: 'La cantidad mínima es 1' })
  cantidad: number;

  @IsNumber({}, { message: 'El precio unitario debe ser un número' })
  @Min(0, { message: 'El precio unitario no puede ser negativo' })
  precioUnitario: number;
}

export class CrearOrdenDto {
  @IsArray({ message: 'Debe proporcionar un array de items' })
  @ValidateNested({ each: true })
  @Type(() => ItemOrdenDto)
  items: ItemOrdenDto[];

  @IsOptional()
  @IsString({ message: 'La dirección de envío debe ser texto' })
  direccionEnvio?: string;

  @IsOptional()
  @IsString({ message: 'El método de pago debe ser texto' })
  metodoPago?: string;
}
