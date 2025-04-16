import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProductoInteractor } from '../../../data/interactors/contracts/producto/iproducto.interactor';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoModel } from '../../../domain/models/producto/producto.model';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { ProductoAlertaComponent } from '../producto-alerta/producto-alerta.component';
import { NotificacionService } from '../../shared/components/notification/notificacion.service';
import { NotificacionComponent } from '../../shared/components/notification/notificacion.component';
@Component({
  selector: 'app-producto-lista',
  imports: [
    CommonModule,
    FormsModule,
    ProductoAlertaComponent,
    NotificacionComponent,
  ],
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.scss',
})
export class ProductoListaComponent implements OnInit, OnDestroy {
  loadingProductos: boolean = false;
  productos: ProductoModel[] = [];
  productosFiltrados: ProductoModel[] = [];
  productosPaginados: ProductoModel[] = []; // Nuevo array para la paginación
  resultadosPorPaginaOptions: number[] = [5, 10, 15, 20, 30];
  resultadosPorPagina: number;
  activeDropdown: HTMLElement | null = null;
  busquedaTerm$ = new Subject<string>();
  busquedaSubscription: Subscription | undefined;
  abiertoEliminacionModal: boolean = false;
  codigoProductoBorrar: string | null = null;

  cabeceras = [
    {
      nombre: 'Logo',
      tieneIcono: false,
    },
    {
      nombre: 'Nombre del producto',
      tieneIcono: false,
    },
    {
      nombre: 'Descripción',
      tieneIcono: true,
    },
    {
      nombre: 'Fecha de liberación',
      tieneIcono: true,
    },
    {
      nombre: 'Fecha de reestructuración',
      tieneIcono: true,
    },
  ];

  @ViewChildren('dropdownTrigger') dropdownTriggers!: QueryList<ElementRef>;
  @ViewChildren('dropdownContent') dropdownContents!: QueryList<ElementRef>;

  constructor(
    private readonly productoInteractor: IProductoInteractor,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notificacionService: NotificacionService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.resultadosPorPagina = this.resultadosPorPaginaOptions[0];
  }

  ngOnInit(): void {
    this.consultarProductos();
    this.setupSearchDebounce();
  }

  ngOnDestroy(): void {
    if (this.busquedaSubscription) {
      this.busquedaSubscription.unsubscribe();
    }
  }

  abrirEliminacionConfirmacion(codigoProducto: string): void {
    this.codigoProductoBorrar = codigoProducto;
    this.abiertoEliminacionModal = true;
  }

  cerrarEliminacionConfirmacion(): void {
    this.abiertoEliminacionModal = false;
    this.codigoProductoBorrar = null;
  }
  confirmarBorrado(): void {
    if (this.codigoProductoBorrar) {
      this.eliminarProducto(this.codigoProductoBorrar);
      this.cerrarEliminacionConfirmacion();
    }
  }

  consultarProductos() {
    this.loadingProductos = true;
    setTimeout(() => {
      this.productoInteractor.consultarProductos().subscribe({
        next: (productos) => {
          this.productos = productos;
          this.productosFiltrados = [...productos];
          this.actualizarPaginacion();
          this.loadingProductos = false;
        },
        error: (error) => {
          this.loadingProductos = false;
          this.notificacionService.sendNotification(
            'Error al consultar productos',
            'error'
          );
        },
      });
    }, 4000);
  }

  abrirFormulario(codigoProducto?: string): void {
    if (codigoProducto) {
      this.router.navigate([`editar/${codigoProducto}`], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(['nuevo'], { relativeTo: this.route });
    }
  }

  eliminarProducto(codigoProducto: string): void {
    this.productoInteractor.eliminarProducto(codigoProducto).subscribe({
      next: () => {
        this.notificacionService.sendNotification(
          'Producto eliminado exitosamente!',
          'success'
        );
        this.consultarProductos();
      },
      error: (error) => {
        this.notificacionService.sendNotification(
          'Error al eliminar producto',
          'error'
        );
      },
    });
  }

  public onResultadosPorPaginaChange(event: any): void {
    this.resultadosPorPagina = parseInt(event.target.value, 10);
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    const startIndex = 0;
    const endIndex = startIndex + this.resultadosPorPagina;
    this.productosPaginados = this.productosFiltrados.slice(
      startIndex,
      endIndex
    );
  }

  toggleDropdown(event: Event, index: number) {
    const clickedTrigger = event.currentTarget as HTMLElement;
    const dropdownContent =
      this.dropdownContents.toArray()[index].nativeElement;

    if (this.activeDropdown && this.activeDropdown !== dropdownContent) {
      this.renderer.setStyle(this.activeDropdown, 'display', 'none');
    }

    if (dropdownContent.style.display === 'block') {
      this.renderer.setStyle(dropdownContent, 'display', 'none');
      this.activeDropdown = null;
    } else {
      this.renderer.setStyle(dropdownContent, 'display', 'block');
      this.activeDropdown = dropdownContent;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.activeDropdown && !this.el.nativeElement.contains(event.target)) {
      this.renderer.setStyle(this.activeDropdown, 'display', 'none');
      this.activeDropdown = null;
    }
  }

  onSearchInput(event: any) {
    this.busquedaTerm$.next(event.target.value);
  }

  setupSearchDebounce() {
    this.busquedaSubscription = this.busquedaTerm$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.filtrarProductos(term);
        this.actualizarPaginacion();
      });
  }

  filtrarProductos(term: string) {
    if (!term) {
      this.productosFiltrados = [...this.productos];
    } else {
      const lowerCaseTerm = term.toLowerCase();
      this.productosFiltrados = this.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }
}
