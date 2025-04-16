import { Observable } from 'rxjs';
import { RespuestaEntity } from '../../../../../../core/base/entities/respuesta.entity';
import { ProductoEntity } from '../entities/producto.entity';

export abstract class IProductoAdapter {
  abstract consultarProductos(): Observable<RespuestaEntity<ProductoEntity[]>>;

  abstract consultarProducto(codigo: string): Observable<ProductoEntity>;

  abstract verificarProducto(codigo: string): Observable<boolean>;

  abstract crearProducto(
    producto: ProductoEntity
  ): Observable<RespuestaEntity<ProductoEntity>>;

  abstract actualizarProducto(
    producto: ProductoEntity
  ): Observable<RespuestaEntity<ProductoEntity>>;

  abstract eliminarProducto(
    codigo: string
  ): Observable<RespuestaEntity<ProductoEntity>>;
}
