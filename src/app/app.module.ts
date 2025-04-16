import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './presentation/layout/app.layout.module';
import { RouterModule } from '@angular/router';
import { DATA_IOC } from './data/dataioc/data.io';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { NotificacionComponent } from './presentation/shared/components/notification/notificacion.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    NotificacionComponent,
  ],
  providers: [provideHttpClient(), ...DATA_IOC],
  bootstrap: [AppComponent],
})
export class AppModule {}
