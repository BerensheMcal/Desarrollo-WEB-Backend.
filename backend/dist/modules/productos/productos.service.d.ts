import { Repository } from 'typeorm';
import { Producto } from '../../database/entities/producto.entity';
import { ImagenProducto } from '../../database/entities/imagen-producto.entity';
export declare class ProductosService {
    private readonly productoRepo;
    private readonly imagenRepo;
    constructor(productoRepo: Repository<Producto>, imagenRepo: Repository<ImagenProducto>);
    listar(): Promise<Producto[]>;
    listarDestacados(limite?: number): Promise<Producto[]>;
    buscarPorId(id: number): Promise<Producto>;
    buscarPorCategoria(categoriaId: number): Promise<Producto[]>;
    crear(data: Partial<Producto>): Promise<Producto>;
    actualizar(id: number, data: Partial<Producto>): Promise<Producto>;
    eliminarSuave(id: number): Promise<Producto>;
    agregarImagen(productoId: number, url: string, orden?: number): Promise<ImagenProducto>;
    eliminarImagen(imagenId: number): Promise<import("typeorm").DeleteResult>;
    obtenerMasVendidos(limite?: number): Promise<any>;
}
