import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario, RolUsuario } from '../entities/usuario.entity';
import { Configuracion } from '../entities/configuracion.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Configuracion)
    private readonly configRepo: Repository<Configuracion>,
  ) {}

  async ejecutar(): Promise<void> {
    this.logger.log('Iniciando seed de datos...');

    const salt = await bcrypt.genSalt(10);

    const adminExiste = await this.usuarioRepo.findOne({
      where: { email: 'heidy@tienda.com' },
    });

    if (!adminExiste) {
      const contrasenaAdmin = 'HeidyAdmin_2024$';
      const admin = this.usuarioRepo.create({
        nombre: 'Heidy Administradora',
        email: 'heidy@tienda.com',
        contrasenaHash: await bcrypt.hash(contrasenaAdmin, salt),
        rol: RolUsuario.ADMIN,
        celular: '555-0100',
        direccion: 'Dirección de la tienda',
      });
      await this.usuarioRepo.save(admin);
      this.logger.log(`Admin creado: heidy@tienda.com / ${contrasenaAdmin}`);
    } else {
      this.logger.log('Admin ya existe, saltando...');
    }

    const staffExiste = await this.usuarioRepo.findOne({
      where: { email: 'staff@tienda.com' },
    });

    if (!staffExiste) {
      const contrasenaStaff = 'StaffTienda_2024$';
      const staff = this.usuarioRepo.create({
        nombre: 'Staff Tienda',
        email: 'staff@tienda.com',
        contrasenaHash: await bcrypt.hash(contrasenaStaff, salt),
        rol: RolUsuario.STAFF,
        celular: '555-0200',
      });
      await this.usuarioRepo.save(staff);
      this.logger.log(`Staff creado: staff@tienda.com / ${contrasenaStaff}`);
    } else {
      this.logger.log('Staff ya existe, saltando...');
    }

    const descuentoExiste = await this.configRepo.findOne({ where: { clave: 'descuento_cliente_frecuente' } });
    if (!descuentoExiste) {
      await this.configRepo.save(this.configRepo.create({ clave: 'descuento_cliente_frecuente', valor: '10' }));
      this.logger.log('Descuento cliente frecuente creado: 10%');
    } else {
      this.logger.log('Descuento ya existe, saltando...');
    }

    this.logger.log('Seed completado.');
  }
}
