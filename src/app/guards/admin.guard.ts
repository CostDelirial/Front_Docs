import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private _usuarioService: UsuarioService,private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

      if ( this._usuarioService.role === 'ADMINISTRADOR'){
        return true;
      }else{
        const toast = Swal.mixin({
          toast: true,
          position:'top-end',
          showConfirmButton: false,
          timer: 3000,
          background:'rgba(255,255,255,0.8)'
  
        });
        toast.fire({
          icon: 'warning',
          title:'No tienes los permisos necesarios'
        })
        this.router.navigateByUrl('/api/dashboard');
        return false;
      }
      
  }
  
}
