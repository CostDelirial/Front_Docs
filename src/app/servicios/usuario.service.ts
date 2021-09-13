import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../auth/interfaces/login-form';
import { RegisterForm } from '../auth/interfaces/register-form';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  id: string;


  constructor( private http: HttpClient,
                private router: Router ) { }


                get token(): string {
                  return localStorage.getItem('token') || '';
                }

                get role(): string {
                  return this.usuario.role;
                }

                get uid():string{
                  return this.usuario.uid || '';
                }
              
                get headers() {
                  return {
                    headers: {
                      'x-token': this.token
                    }
                  }
                }


                guardarLocalStorage( token: string, menu: any){
                  localStorage.setItem('token', token );
                  sessionStorage.setItem('menu', JSON.stringify(menu));
                }

  //cerrar sesion
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }


  //obtener validacion de token y renovacion del mismo 
  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, 
    {
      headers: {
      'x-token': token
    }
  }).pipe(
    tap( ( resp: any ) => {
      const { control, fechaInicio, nombre, role, status, uid } = resp.usuario;

        this.usuario = new Usuario(nombre,control,'',status,role,uid,fechaInicio);
      this.usuario.imprimirUsuario();
      this.guardarLocalStorage(resp.token,resp.menu);
    }),
    map( resp => true),
    
    catchError( error => of(false) )
  );
     
  }


  //registro de usuario desde afuera
  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData )
  }

//login de usuarios
login( formData: LoginForm ){

  return this.http.post(`${base_url}/login`, formData )
              .pipe(
                tap( (resp: any) => {
                  console.log(resp.menu);
                  localStorage.setItem('token', resp.token );
                  localStorage.setItem('menu',JSON.stringify(resp.menu));
                  sessionStorage.setItem('menu', JSON.stringify(resp.menu));
                })
              )
}

cargarUsuarios(){
  return this.http.get(`${base_url}/usuarios`,this.headers);
}


cambiarEstatusUser(uid: string, estatus: string){
  const url = `${base_url}/usuarios/${uid}/${estatus}`;
  return this.http.put(url,'',this.headers);
}

cambiarRole(uid: string, formData: any){
  const url = `${base_url}/usuarios/cambiar/role/${uid}`;
  return this.http.put(url,formData,this.headers);

}

buscarRoleId(uid: string){
const url = `${base_url}/usuarios/buscar/role/${uid}`;
return this.http.get(url,this.headers);
}
 ///////////////////////////////////////////////
  //    limpiar id en cache del modal 
  //////////////////////////////////////////////
  setearId( id: string){
    this.id = id;
  }
}
