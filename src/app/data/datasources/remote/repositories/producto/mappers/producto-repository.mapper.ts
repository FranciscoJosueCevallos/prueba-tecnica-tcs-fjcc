import { Mapper } from '../../../../../../core/base/contracts/mapper.contract';
import { ProductoModel } from '../../../../../../domain/models/producto/producto.model';
import { ProductoEntity } from '../entities/producto.entity';

export class ProductoRepositoryMapper extends Mapper<
  ProductoEntity,
  ProductoModel
> {
  mapFrom(param: ProductoEntity): ProductoModel {
    return {
      codigo: param.id,
      nombre: param.name,
      logo: param.logo,
      descripcion: param.description,
      fecha_creacion: param.date_release,
      fecha_modificacion: param.date_revision,
    };
  }

  mapTo(param: ProductoModel): ProductoEntity {
    return {
      id: param.codigo,
      name: param.nombre,
      logo: param.logo,
      description: param.descripcion,
      date_release: param.fecha_creacion,
      date_revision: param.fecha_modificacion,
    };
  }
}

export class ListaProductoRepositoryMapper extends Mapper<
  ProductoEntity[],
  ProductoModel[]
> {
  mapFrom(param: ProductoEntity[]): ProductoModel[] {
    return param.map((item) => {
      return {
        codigo: item.id,
        nombre: item.name,
        logo: item.logo,
        descripcion: item.description,
        fecha_creacion: item.date_release,
        fecha_modificacion: item.date_revision,
      };
    });
  }

  mapTo(param: ProductoModel[]): ProductoEntity[] {
    return param.map((item) => {
      return {
        id: item.codigo,
        name: item.nombre,
        logo: item.logo,
        description: item.descripcion,
        date_release: item.fecha_creacion,
        date_revision: item.fecha_modificacion,
      };
    });
  }
}
