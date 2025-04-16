import { inject, Injectable } from '@angular/core';
import { IProductoAdapter } from './adapters/iproducto.adapter';
import {
  ListaProductoRepositoryMapper,
  ProductoRepositoryMapper,
} from './mappers/producto-repository.mapper';
import { ProductoModel } from '../../../../../domain/models/producto/producto.model';
import { map, Observable } from 'rxjs';
import { ProductoEntity } from './entities/producto.entity';
import { IProductoRepository } from '../../../../../domain/repositories/producto/iproducto.repository';
import { RespuestaEntity } from '../../../../../core/base/entities/respuesta.entity';

@Injectable({ providedIn: 'root' })
export class ProductoService implements IProductoRepository {
  private readonly productoAdapter: IProductoAdapter = inject(IProductoAdapter);
  private readonly productoRepositoryMapper = new ProductoRepositoryMapper();
  private readonly listaProductoRepositoryMapper =
    new ListaProductoRepositoryMapper();

  constructor() {}

  public consultarProductos(): Observable<ProductoModel[]> {
    return this.productoAdapter.consultarProductos().pipe(
      map((respuesta) => {
        const productosEntity: RespuestaEntity<ProductoEntity[]> = respuesta;
        const productosModel = this.listaProductoRepositoryMapper.mapFrom(
          productosEntity.data ?? []
        );

        return productosModel;
      })
    );
  }

  public consultarProducto(codigo: string): Observable<ProductoModel> {
    return this.productoAdapter.consultarProducto(codigo).pipe(
      map((respuesta) => {
        const productoEntity: ProductoEntity = respuesta;
        const productoModel = this.productoRepositoryMapper.mapFrom(
          productoEntity ?? {}
        );

        return productoModel;
      })
    );
  }

  public verificarProducto(codigo: string): Observable<boolean> {
    return this.productoAdapter.verificarProducto(codigo).pipe(
      map((respuesta) => {
        return respuesta as boolean;
      })
    );
  }

  public crearProducto(producto: ProductoModel): Observable<string> {
    return this.productoAdapter
      .crearProducto(this.productoRepositoryMapper.mapTo(producto))
      .pipe(
        map((respuesta) => {
          if (respuesta.name) {
            throw new Error(respuesta.name);
          }

          if (respuesta.data) {
            return `Producto ${respuesta.data.name} añadido satisfactoriamente`;
          }
          return {} as string;
        })
      );
  }

  public actualizarProducto(producto: ProductoModel): Observable<string> {
    return this.productoAdapter
      .actualizarProducto(this.productoRepositoryMapper.mapTo(producto))
      .pipe(
        map((respuesta) => {
          if (respuesta.name) {
            throw new Error(respuesta.name);
          }

          if (respuesta.data) {
            return `Producto con ${producto.codigo} actualizado satisfactoriamente`;
          }

          return {} as string;
        })
      );
  }

  public eliminarProducto(codigo: string): Observable<string> {
    return this.productoAdapter.eliminarProducto(codigo).pipe(
      map((respuesta) => {
        if (respuesta.name) {
          throw new Error(respuesta.name);
        }

        if (respuesta.data) {
          return `Producto con ${codigo} eliminado satisfactoriamente`;
        }

        return {} as string;
      })
    );
  }
}
