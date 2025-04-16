import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ProductoModule } from './producto/producto.module';
import { NotificacionComponent } from './shared/components/notification/notificacion.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, PresentationRoutingModule, ProductoModule],
})
export class PresentationModule {}
