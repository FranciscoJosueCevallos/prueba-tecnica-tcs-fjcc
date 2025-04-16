import { Observable } from 'rxjs';
import { ProductoModel } from '../../../../domain/models/producto/producto.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class IProductoInteractor {
  abstract consultarProductos(): Observable<ProductoModel[]>;

  abstract consultarProducto(codigo: string): Observable<ProductoModel>;

  abstract verificarExistenciaProducto(codigo: string): Observable<boolean>;

  abstract crearProducto(producto: ProductoModel): Observable<string>;

  abstract actualizarProducto(producto: ProductoModel): Observable<string>;

  abstract eliminarProducto(codigo: string): Observable<string>;
}
