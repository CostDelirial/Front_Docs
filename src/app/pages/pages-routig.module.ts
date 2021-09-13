import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { EnTramiteComponent } from './en-tramite/en-tramite.component';
import { FinalizadoComponent } from './finalizado/finalizado.component';
import { EnRevisionComponent } from './en-revision/en-revision.component';
import { PendienteComponent } from './pendiente/pendiente.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminGuard } from '../guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';



const routes: Routes = [
    { 
        path:'api', 
        component: PagesComponent, 
        canActivate:[ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}},
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
          { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda'} },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Usuario'}},
          { path: 'en_tramite', component: EnTramiteComponent, data: { titulo: 'En Tramite'} },
          { path: 'finalizado', component: FinalizadoComponent, data: { titulo: 'Finalizados'} },
          { path: 'en_revision', component: EnRevisionComponent, data: { titulo: 'En Revisión'} },
          { path: 'pendiente', component: PendienteComponent, data: { titulo: 'Pendientes'} },

          //Rutas de Admin

          { path: 'usuarios',canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios'} },
         

        ]
      },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
