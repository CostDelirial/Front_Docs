import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ '../login/login.component.css' ]
})
export class RegisterComponent  {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(10)]],
    control: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    password2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    //terminos: [false, Validators.required],
  }, {
    validators: this.passwordsIguales('password','password2')
  });

  constructor( private fb: FormBuilder,
                private _usuarioService: UsuarioService,
                public router: Router,
                ) { }

 
  crearUsuario(){
    this.formSubmitted = true;

    

    if( this.registerForm.invalid ){
      return;
    }

    //Realizar la creacion
    this._usuarioService.crearUsuario(this.registerForm.value)
    .subscribe( (resp: any ) => {
      const nombre = resp.usuario.nombre;
      Swal.fire(nombre,'Cuenta registrada, comunicate con el Admin para que la active',"warning" );
      this.registerForm.reset();
      this.router.navigateByUrl("/login");
      

    }, (err)=> {
      Swal.fire('Error', err.error.msg,'error' );
    });
    
  }

  campoNoValido( campo: string ): boolean{

    if( this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  
  }

  contrasenaNoValida(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

      if( (pass1 != pass2) && this.formSubmitted ){
        return true;
      }else{
        return false;
      }

  }
  /*aceptaLosTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }*/

  passwordsIguales(pass1Name: string, pass2Name: string ){
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({ noEsIgual: true})
      }
    }
  }
}
