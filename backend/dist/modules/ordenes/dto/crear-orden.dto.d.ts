declare class ItemOrdenDto {
    productoId: number;
    cantidad: number;
    precioUnitario: number;
}
export declare class CrearOrdenDto {
    items: ItemOrdenDto[];
    direccionEnvio?: string;
    metodoPago?: string;
}
export {};
