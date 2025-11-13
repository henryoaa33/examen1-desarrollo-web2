export type CategoriaGasto = 'comida' | 'Trasporte' | 'Entremiento' | 'ropa';

export interface Gasto {
    idgasto?: number;
    categoria: CategoriaGasto;
  descripcion: string;
    monto: number;
    fecha: string;
}