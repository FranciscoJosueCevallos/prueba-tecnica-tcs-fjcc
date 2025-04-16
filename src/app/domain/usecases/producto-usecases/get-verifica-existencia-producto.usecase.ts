import { Observable, throwError } from 'rxjs';
import { ProductoModel } from '../../models/producto/producto.model';
import { IProductoRepository } from '../../repositories/producto/iproducto.repository';
import { UseCase } from '../../../core/base/contracts/usecase.contract';
import { Injectable } from '@angular/core';
import { Param } from '../../../core/base/contracts/param.contract';

@Injectable({ providedIn: 'root' })
export class GetVerificarExistenciaProductoUseCase
  implements UseCase<Param<string>, Observable<boolean>>
{
  constructor(private readonly productoRepository: IProductoRepository) {}

  execute(codigo?: Param<string>): Observable<boolean> {
    if (codigo) {
      return this.productoRepository.verificarProducto(codigo.payload);
    } else {
      return throwError(() => new Error('El codigo no puede ser nulo'));
    }
  }
}
