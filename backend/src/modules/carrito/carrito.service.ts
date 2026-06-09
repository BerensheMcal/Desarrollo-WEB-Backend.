import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from '../../database/entities/carrito.entity';
import { ItemCarrito } from '../../database/entities/item-carrito.entity';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepo: Repository<Carrito>,
    @InjectRepository(ItemCarrito)
    private readonly itemRepo: Repository<ItemCarrito>,
  ) {}

  async obtenerOcrear(usuarioId: number) {
    let carrito = await this.carritoRepo.findOne({
      where: { usuarioId },
      relations: { items: { producto: true } },
    });
    if (!carrito) {
      carrito = this.carritoRepo.create({ usuarioId });
      carrito = await this.carritoRepo.save(carrito);
    }
    return carrito;
  }

  async agregarItem(usuarioId: number, productoId: number, cantidad: number) {
    const carrito = await this.obtenerOcrear(usuarioId);
    let item = await this.itemRepo.findOne({ where: { carritoId: carrito.id, productoId } });
    if (item) {
      item.cantidad += cantidad;
    } else {
      item = this.itemRepo.create({ carritoId: carrito.id, productoId, cantidad });
    }
    return this.itemRepo.save(item);
  }

  async eliminarItem(usuarioId: number, itemId: number) {
    const carrito = await this.obtenerOcrear(usuarioId);
    return this.itemRepo.delete({ id: itemId, carritoId: carrito.id });
  }

  async vaciar(usuarioId: number) {
    const carrito = await this.obtenerOcrear(usuarioId);
    return this.itemRepo.delete({ carritoId: carrito.id });
  }
}
