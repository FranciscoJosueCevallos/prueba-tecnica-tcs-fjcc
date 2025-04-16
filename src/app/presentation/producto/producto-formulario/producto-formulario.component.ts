import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductoInteractor } from '../../../data/interactors/contracts/producto/iproducto.interactor';
import { FormularioValidator } from '../../../core/validators/formulario-validator';
import { ProductoModel } from '../../../domain/models/producto/producto.model';
import { NotificacionService } from '../../shared/components/notification/notificacion.service';

@Component({
  selector: 'app-producto-formulario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-formulario.component.html',
  styleUrls: ['./producto-formulario.component.scss'],
})
export class ProductoFormularioComponent implements OnInit {
  productoForm!: FormGroup;
  modoEdicion: boolean = false;
  productoId: string | null = null;
  productoEdicion!: ProductoModel;

  constructor(
    private readonly fb: FormBuilder,
    private readonly productoInteractor: IProductoInteractor,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.verificarModoEdicion();
  }

  crearFormulario() {
    this.productoForm = this.fb.group({
      codigo: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        [FormularioValidator.uniqueId(this.productoInteractor)],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      fecha_creacion: [
        '',
        [Validators.required, FormularioValidator.fechaMayorIgualHoy()],
      ],
      fecha_modificacion: [{ value: '', disabled: true }],
    });

    this.productoForm
      .get('fecha_creacion')
      ?.valueChanges.subscribe((fechaLiberacion) => {
        const fechaRevision =
          FormularioValidator.calcularFechaRevision(fechaLiberacion);
        this.productoForm.get('fecha_modificacion')?.setValue(fechaRevision);
      });
  }

  verificarModoEdicion(): void {
    this.productoId = this.route.snapshot.paramMap.get('id');
    this.modoEdicion = !!this.productoId;

    if (this.modoEdicion && this.productoId) {
      this.cargarProducto(this.productoId);
    }
  }

  cargarProducto(id: string): void {
    this.productoInteractor.consultarProducto(id).subscribe({
      next: (producto: ProductoModel) => {
        this.productoForm.patchValue(producto);
        this.productoForm.get('codigo')?.disable(); // Enable the 'codigo' field
        this.productoEdicion = producto;
      },
      error: (error) => {
        this.notificacionService.sendNotification(
          'Error al cargar el producto',
          'error'
        );
        this.router.navigate(['/producto']);
      },
    });
  }

  public onSubmit(): void {
    if (this.productoForm.valid) {
      if (this.modoEdicion) {
        this.editarProducto();
      } else {
        this.crearProducto();
      }
    }
  }

  crearProducto(): void {
    this.productoInteractor.crearProducto(this.crearSolicitud()).subscribe({
      next: (response) => {
        this.notificacionService.sendNotification(
          'Producto creado exitosamente!',
          'success'
        );
        this.router.navigate(['/producto']);
      },
      error: (error) => {
        this.notificacionService.sendNotification(
          'Error al crear el producto',
          'error'
        );
      },
    });
  }
  editarProducto(): void {
    this.productoInteractor
      .actualizarProducto(this.crearSolicitud())
      .subscribe({
        next: (response) => {
          this.notificacionService.sendNotification(
            'Producto actualizado exitosamente!',
            'success'
          );
          this.router.navigate(['/producto']);
        },
        error: (error) => {
          this.notificacionService.sendNotification(
            'Error al editar el producto',
            'error'
          );
        },
      });
  }

  crearSolicitud(): ProductoModel {
    return {
      codigo: this.productoForm.get('codigo')?.value,
      nombre: this.productoForm.get('nombre')?.value,
      logo: this.productoForm.get('logo')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      fecha_creacion: this.productoForm.get('fecha_creacion')?.value,
      fecha_modificacion: this.productoForm.get('fecha_modificacion')?.value,
    };
  }

  public reiniciar(): void {
    if (this.modoEdicion) {
      this.productoForm.patchValue(this.productoEdicion);
    } else {
      this.productoForm.reset();
    }
  }

  public verificarErrores(): void {
    Object.keys(this.productoForm.controls).forEach((controlName) => {
      const control = this.productoForm.get(controlName);
      if (control && control.invalid) {
        console.error(
          `El control '${controlName}' es inválido. Errores:`,
          control.errors
        );
      }
    });
  }
}
