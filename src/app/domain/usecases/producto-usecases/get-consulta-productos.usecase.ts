import { Observable } from 'rxjs';
import { ProductoModel } from '../../models/producto/producto.model';
import { IProductoRepository } from '../../repositories/producto/iproducto.repository';
import { UseCase } from '../../../core/base/contracts/usecase.contract';
import { NoParam } from '../../../core/base/contracts/no-param.contract';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GetConsultaProductosUseCase
  implements UseCase<NoParam, Observable<ProductoModel[]>>
{
  constructor(private readonly productoRepository: IProductoRepository) {}

  execute(): Observable<ProductoModel[]> {
    return this.productoRepository.consultarProductos();
  }
}
