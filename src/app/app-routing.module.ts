import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Module
import { PagesRoutingModule } from './pages/pages-routig.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { ArchivoComponent } from './modales/archivo/archivo.component';
import { RespuestaComponent } from './modales/respuesta/respuesta.component';
import { ValidacionComponent } from './modales/validacion/validacion.component';
import { FileUploadComponent } from './modales/file-upload/file-upload.component';
import { RolesComponent } from './modales/roles/roles.component';

const routes: Routes =[

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  { path: '', redirectTo:'/api/', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
  { path: 'archivoNuevo', component: ArchivoComponent, outlet: 'modal'},
  { path: 'respuestaDoc', component: RespuestaComponent, outlet: 'modal'},
  { path: 'validacionDoc', component: ValidacionComponent, outlet: 'modal'},
  { path: 'cambiarRole', component: RolesComponent, outlet: 'modal'},
  { path: 'subirArchivo', component: FileUploadComponent, outlet: 'modal'},


]


@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
