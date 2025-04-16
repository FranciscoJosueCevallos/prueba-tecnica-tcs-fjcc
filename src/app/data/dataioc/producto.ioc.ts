import { provideAnimations } from '@angular/platform-browser/animations';
import { IProductoRepository } from '../../domain/repositories/producto/iproducto.repository';
import { GetConsultaProductoUseCase } from '../../domain/usecases/producto-usecases/get-consulta-producto.usecase';
import { GetConsultaProductosUseCase } from '../../domain/usecases/producto-usecases/get-consulta-productos.usecase';
import { PostCreaProductoUseCase } from '../../domain/usecases/producto-usecases/post-crea-producto.usecase';
import { PutActualizaProductoUseCase } from '../../domain/usecases/producto-usecases/put-actualiza-producto.usecase';
import { IProductoAdapter } from '../datasources/remote/repositories/producto/adapters/iproducto.adapter';
import { ProductoAdapter } from '../datasources/remote/repositories/producto/adapters/producto.adapter';
import { ProductoService } from '../datasources/remote/repositories/producto/producto.service';
import { IProductoInteractor } from '../interactors/contracts/producto/iproducto.interactor';
import { ProductoInteractor } from '../interactors/implementations/producto/producto.interactor';
import { DeleteEliminaProductoUseCase } from '../../domain/usecases/producto-usecases/delete-elimina-producto.usecase';
import { GetVerificarExistenciaProductoUseCase } from '../../domain/usecases/producto-usecases/get-verifica-existencia-producto.usecase';

export const PRODUCTO_IOC = [
  {
    provide: IProductoInteractor,
    useClass: ProductoInteractor,
  },
  {
    provide: IProductoRepository,
    useClass: ProductoService,
  },
  {
    provide: IProductoAdapter,
    useClass: ProductoAdapter,
  },
  { provide: ProductoService, useFactory: () => new ProductoService() },
  { provide: ProductoAdapter, useFactory: () => new ProductoAdapter() },
  {
    deps: [IProductoRepository],
    provide: GetConsultaProductosUseCase,
    useFactory: (productoRepository: IProductoRepository) => {
      return new GetConsultaProductosUseCase(productoRepository);
    },
  },
  {
    deps: [IProductoRepository],
    provide: GetVerificarExistenciaProductoUseCase,
    useFactory: (productoRepository: IProductoRepository) => {
      return new GetVerificarExistenciaProductoUseCase(productoRepository);
    },
  },
  {
    deps: [IProductoRepository],
    provide: GetConsultaProductoUseCase,
    useFactory: (productoRepository: IProductoRepository) => {
      return new GetConsultaProductoUseCase(productoRepository);
    },
  },
  {
    deps: [IProductoRepository],
    provide: PostCreaProductoUseCase,
    useFactory: (productoRepository: IProductoRepository) => {
      return new PostCreaProductoUseCase(productoRepository);
    },
  },
  {
    deps: [IProductoRepository],
    provide: PutActualizaProductoUseCase,
    useFactory: (productoRepository: IProductoRepository) => {
      return new PutActualizaProductoUseCase(productoRepository);
    },
  },
  {
    deps: [IProductoRepository],
    provide: DeleteEliminaProductoUseCase,
    useFactory: (productoRepository: IProductoRepository) => {
      return new DeleteEliminaProductoUseCase(productoRepository);
    },
  },
];
