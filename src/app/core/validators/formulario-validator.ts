import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProductoInteractor } from '../../data/interactors/implementations/producto/producto.interactor';
import { catchError, map, of } from 'rxjs';
import { IProductoInteractor } from '../../data/interactors/contracts/producto/iproducto.interactor';

export class FormularioValidator {
  static uniqueId(productoInteractor: IProductoInteractor): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const id = control.value;
      if (!id) return null;

      return productoInteractor.verificarExistenciaProducto(id).pipe(
        map((exists) => (exists ? { uniqueId: true } : null)), // Si existe, retorna error; si no, retorna null
        catchError((error) => {
          console.error('Error al verificar la existencia del ID:', error);
          return of(null); // En caso de error, no se considera inválido
        })
      );
    };
  }

  static fechaMayorIgualHoy(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fecha = new Date(control.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      return fecha >= hoy ? null : { fechaInvalida: true };
    };
  }

  static calcularFechaRevision(fechaLiberacion: string): string {
    const fecha = new Date(fechaLiberacion);
    fecha.setFullYear(fecha.getFullYear() + 1);
    return fecha.toISOString().split('T')[0];
  }
}
