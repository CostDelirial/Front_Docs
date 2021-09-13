import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ModalesIsService } from 'src/app/servicios/modales.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: []
})
export class UsuariosComponent implements OnInit {

  public usuario:any[]=[];
  uid_user: string;


  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _eventModal: ModalesIsService,
    private _usuarioService: UsuarioService,
  ) {
    
    this.cargarUsuarios();
   }

  ngOnInit(): void {
    
  }

  cargarUsuarios(){

    this._usuarioService.cargarUsuarios().subscribe(( resp: any ) => {
      this.usuario = resp.usuario;
      console.log(this.usuario);
    }, (err) =>{
      console.log(err.error.msg);
    })
  }

  estatusUser( uid: string, estatus:string){   
    console.log(uid);
    if( uid === this._usuarioService.uid ){
      const toast = Swal.mixin({
        toast: true,
        position:'top-end',
        showConfirmButton: false,
        timer: 2000,
        background:'rgba(0,0,0,0.96)'

      });
      toast.fire({
        icon: 'error',
        title:'No puedes eliminarte a ti mismo'
      })
      return;
    }
    this._usuarioService.cambiarEstatusUser(uid, estatus)
    .subscribe( ( resp: any ) =>{
      Swal.fire('Cambio de estatus con exito',resp.usuarioStatus.status,'success');
      this.cargarUsuarios();
    }, ( err ) => {
      Swal.fire('Error', err.error.msg,'error');
    })
  }


  cambiarRole(uid: string){
    console.log(uid);
    this._usuarioService.setearId(uid);
    this._eventModal.abrirModal('cambiarRole')
  }
}
