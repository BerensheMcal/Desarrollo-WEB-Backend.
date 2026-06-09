import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CrearTallerDto } from './crear-taller.dto';

export class ActualizarTallerDto extends PartialType(CrearTallerDto) {}
