import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoFormularioComponent } from './producto-formulario/producto-formulario.component';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ProductoFormularioComponent,
    ProductoListaComponent,
  ],
})
export class ProductoModule {}
