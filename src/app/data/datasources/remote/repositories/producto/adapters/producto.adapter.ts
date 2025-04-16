import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProductoAdapter } from './iproducto.adapter';
import { environment } from '../../../../../../../environments/environment';
import { RespuestaEntity } from '../../../../../../core/base/entities/respuesta.entity';
import { ProductoEntity } from '../entities/producto.entity';

@Injectable({ providedIn: 'root' })
export class ProductoAdapter implements IProductoAdapter {
  private readonly httpClient = inject(HttpClient);
  private readonly urlBase: string = `${environment.apiUrl}/products`;

  constructor() {}

  public consultarProductos(): Observable<RespuestaEntity<ProductoEntity[]>> {
    return this.httpClient
      .get<any>(`${this.urlBase}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        map((respuesta) => respuesta.body as RespuestaEntity<ProductoEntity[]>)
      );
  }

  public consultarProducto(codigo: string): Observable<ProductoEntity> {
    return this.httpClient
      .get<any>(`${this.urlBase}/${codigo}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
        responseType: 'json',
      })
      .pipe(map((respuesta) => respuesta.body as ProductoEntity));
  }

  public verificarProducto(codigo: string): Observable<boolean> {
    return this.httpClient
      .get<any>(`${this.urlBase}/verification/${codigo}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
        responseType: 'json',
      })
      .pipe(map((respuesta) => respuesta.body as boolean));
  }

  public crearProducto(
    producto: ProductoEntity
  ): Observable<RespuestaEntity<ProductoEntity>> {
    return this.httpClient
      .post<any>(`${this.urlBase}`, producto, {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        map((respuesta) => respuesta.body as RespuestaEntity<ProductoEntity>)
      );
  }

  public actualizarProducto(
    producto: ProductoEntity
  ): Observable<RespuestaEntity<ProductoEntity>> {
    return this.httpClient
      .put<any>(`${this.urlBase}/${producto.id}`, producto, {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        map((respuesta) => respuesta.body as RespuestaEntity<ProductoEntity>)
      );
  }

  public eliminarProducto(
    codigo: string
  ): Observable<RespuestaEntity<ProductoEntity>> {
    return this.httpClient
      .delete<any>(`${this.urlBase}/${codigo}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        map((respuesta) => respuesta.body as RespuestaEntity<ProductoEntity>)
      );
  }
}
