import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { PageModule } from './pages/page.module';
import { AuthModule } from './auth/auth.module';
import { ShareModule } from './share/share.module';


import { AppComponent } from './app.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { ArchivoComponent } from './modales/archivo/archivo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RespuestaComponent } from './modales/respuesta/respuesta.component';
import { ValidacionComponent } from './modales/validacion/validacion.component';
import { FileUploadComponent } from './modales/file-upload/file-upload.component';
import { RolesComponent } from './modales/roles/roles.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    PagesComponent,
    ArchivoComponent,
    RespuestaComponent,
    ValidacionComponent,
    FileUploadComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageModule,
    AuthModule,
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
