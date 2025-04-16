import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoFormularioComponent } from './producto-formulario/producto-formulario.component';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';

const routes: Routes = [
  { path: '', component: ProductoListaComponent }, // Ruta por defecto
  { path: 'nuevo', component: ProductoFormularioComponent }, // Ruta para crear un nuevo producto
  { path: 'editar/:id', component: ProductoFormularioComponent }, // Ruta para editar un producto existente
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule {}
