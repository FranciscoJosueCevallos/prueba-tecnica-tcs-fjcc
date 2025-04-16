import { Observable, throwError } from 'rxjs';
import { ProductoModel } from '../../models/producto/producto.model';
import { IProductoRepository } from '../../repositories/producto/iproducto.repository';
import { UseCase } from '../../../core/base/contracts/usecase.contract';
import { Injectable } from '@angular/core';
import { Param } from '../../../core/base/contracts/param.contract';

@Injectable({ providedIn: 'root' })
export class PostCreaProductoUseCase
  implements UseCase<Param<ProductoModel>, Observable<string>>
{
  constructor(private readonly productoRepository: IProductoRepository) {}

  execute(producto?: Param<ProductoModel>): Observable<string> {
    if (producto) {
      return this.productoRepository.crearProducto(producto.payload);
    } else {
      return throwError(() => new Error('El codigo no puede ser nulo'));
    }
  }
}
