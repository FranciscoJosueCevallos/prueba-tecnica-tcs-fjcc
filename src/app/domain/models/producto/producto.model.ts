export class ProductoModel {
  codigo: string;
  nombre: string;
  logo: string;
  descripcion: string;
  fecha_creacion: Date;
  fecha_modificacion: Date;

  constructor() {
    this.codigo = '';
    this.nombre = '';
    this.logo = '';
    this.descripcion = '';
    this.fecha_creacion = new Date();
    this.fecha_modificacion = new Date();
  }
}
