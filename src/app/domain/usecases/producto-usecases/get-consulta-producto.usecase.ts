import { Observable, throwError } from 'rxjs';
import { ProductoModel } from '../../models/producto/producto.model';
import { IProductoRepository } from '../../repositories/producto/iproducto.repository';
import { UseCase } from '../../../core/base/contracts/usecase.contract';
import { NoParam } from '../../../core/base/contracts/no-param.contract';
import { Injectable } from '@angular/core';
import { Param } from '../../../core/base/contracts/param.contract';

@Injectable({ providedIn: 'root' })
export class GetConsultaProductoUseCase
  implements UseCase<Param<string>, Observable<ProductoModel>>
{
  constructor(private readonly productoRepository: IProductoRepository) {}

  execute(codigo?: Param<string>): Observable<ProductoModel> {
    if (codigo) {
      return this.productoRepository.consultarProducto(codigo.payload);
    } else {
      return throwError(() => new Error('El codigo no puede ser nulo'));
    }
  }
}
