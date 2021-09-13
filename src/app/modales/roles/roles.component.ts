import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [
  ]
})
export class RolesComponent implements OnInit {
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  public formSubmitted = false;

  id: string;

  public formRole = this.fb.group({
    role: ['',Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.id = this._usuarioService.id;
    if( this.id != null){
      this.cargarRoleId();
    }
  }

  closeModal( $event ){
    this.router.navigate([{outlets: { modal: null }}]);
    this._usuarioService.id = null;
    this.modalClose.next( $event );
  }

  cargarRoleId(){
    
    this._usuarioService.buscarRoleId(this.id).subscribe( ( resp: any ) => {
      const roles = resp.roleDB.role;
this.formRole.get('role').setValue(roles);      
    },(err)=>{
      console.log(err.error.msg);
    });
      
  }

  cambiarRole(){
    this.formSubmitted = true;
    if( this.formRole.invalid ){
      return;
    }
    this._usuarioService.cambiarRole(this.id, this.formRole.value).subscribe(( resp: any) =>{
      Swal.fire('Se cambio el rol con exito','','success');
      this.closeModal('cerrar');


    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })

  }

  campoNoValido( campo: string): boolean{
    if( this.formRole.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

}
