import {
  Entity,
  Column,
} from 'typeorm';
import { EntidadBase } from './entidad-base';

export enum EventoAuditoria {
  INGRESO_EXITOSO = 'INGRESO_EXITOSO',
  INGRESO_FALLIDO = 'INGRESO_FALLIDO',
  CIERRE_SESION = 'CIERRE_SESION',
}

@Entity({ name: 'registros_auditoria' })
export class RegistroAuditoria extends EntidadBase {
  @Column({ name: 'usuario_id', type: 'int', nullable: true })
  usuarioId!: number | null;

  @Column({ name: 'email_intentado', type: 'varchar', length: 200, nullable: true })
  emailIntentado!: string | null;

  @Column({ name: 'direccion_ip', length: 50 })
  direccionIp!: string;

  @Column({
    name: 'evento',
    type: 'enum',
    enum: EventoAuditoria,
  })
  evento!: EventoAuditoria;

  @Column({ name: 'navegador', type: 'varchar', length: 500, nullable: true })
  navegador!: string | null;

  @Column({ name: 'fecha_hora', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaHora!: Date;
}
/* REGISTRO DE AUDITORÍA */