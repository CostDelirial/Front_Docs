import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PendienteComponent } from './pendiente/pendiente.component';
import { EnRevisionComponent } from './en-revision/en-revision.component';
import { EnTramiteComponent } from './en-tramite/en-tramite.component';
import { FinalizadoComponent } from './finalizado/finalizado.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PendienteComponent,
    EnRevisionComponent,
    EnTramiteComponent,
    FinalizadoComponent,
    UsuariosComponent,
    AccountSettingsComponent,
    BusquedaComponent,
  ],
  exports: [
    DashboardComponent,
    PendienteComponent,
    EnRevisionComponent,
    EnTramiteComponent,
    FinalizadoComponent,
    UsuariosComponent,
    AccountSettingsComponent,
    BusquedaComponent,
  ],
  imports: [ 
            CommonModule,
             AppRoutingModule,
             FormsModule,
             ReactiveFormsModule,
             ShareModule,
            ]
})
export class PageModule { }
