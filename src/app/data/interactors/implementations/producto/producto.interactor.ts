import { Injectable } from '@angular/core';
import { IProductoInteractor } from '../../contracts/producto/iproducto.interactor';
import { GetConsultaProductosUseCase } from '../../../../domain/usecases/producto-usecases/get-consulta-productos.usecase';
import { Observable } from 'rxjs';
import { ProductoModel } from '../../../../domain/models/producto/producto.model';
import { PostCreaProductoUseCase } from '../../../../domain/usecases/producto-usecases/post-crea-producto.usecase';
import { PutActualizaProductoUseCase } from '../../../../domain/usecases/producto-usecases/put-actualiza-producto.usecase';
import { DeleteEliminaProductoUseCase } from '../../../../domain/usecases/producto-usecases/delete-elimina-producto.usecase';
import { GetVerificarExistenciaProductoUseCase } from '../../../../domain/usecases/producto-usecases/get-verifica-existencia-producto.usecase';
import { GetConsultaProductoUseCase } from '../../../../domain/usecases/producto-usecases/get-consulta-producto.usecase';
import { Param } from '../../../../core/base/contracts/param.contract';

@Injectable({ providedIn: 'root' })
export class ProductoInteractor implements IProductoInteractor {
  constructor(
    private readonly getConsultaProductosUseCase: GetConsultaProductosUseCase,
    private readonly getConsultaProductoUseCase: GetConsultaProductoUseCase,
    private readonly getverificaExistenciaProductoUseCase: GetVerificarExistenciaProductoUseCase,
    private readonly postCreaProductoUseCase: PostCreaProductoUseCase,
    private readonly putActualizaProductoUseCase: PutActualizaProductoUseCase,
    private readonly deleteEliminaProductoUseCase: DeleteEliminaProductoUseCase
  ) {}

  public consultarProductos(): Observable<ProductoModel[]> {
    return this.getConsultaProductosUseCase.execute();
  }

  public consultarProducto(codigo: string): Observable<ProductoModel> {
    return this.getConsultaProductoUseCase.execute(new Param(codigo));
  }

  public verificarExistenciaProducto(codigo: string): Observable<boolean> {
    return this.getverificaExistenciaProductoUseCase.execute(new Param(codigo));
  }

  public crearProducto(producto: ProductoModel): Observable<string> {
    return this.postCreaProductoUseCase.execute(new Param(producto));
  }

  public actualizarProducto(producto: ProductoModel): Observable<string> {
    return this.putActualizaProductoUseCase.execute(new Param(producto));
  }

  public eliminarProducto(codigo: string): Observable<string> {
    return this.deleteEliminaProductoUseCase.execute(new Param(codigo));
  }
}
