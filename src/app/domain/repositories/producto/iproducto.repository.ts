import { Observable } from 'rxjs';
import { ProductoModel } from '../../models/producto/producto.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class IProductoRepository {
  abstract consultarProductos(): Observable<ProductoModel[]>;

  abstract consultarProducto(codigo: string): Observable<ProductoModel>;

  abstract verificarProducto(codigo: string): Observable<boolean>;

  abstract crearProducto(producto: ProductoModel): Observable<string>;

  abstract actualizarProducto(producto: ProductoModel): Observable<string>;

  abstract eliminarProducto(codigo: string): Observable<string>;
}
