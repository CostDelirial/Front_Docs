import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { WebsocketService } from 'src/app/servicios/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;

  public loginForm = this.fb.group({
    control: [localStorage.getItem('control') || '', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    recordar: [false]

  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private _usuarioiService: UsuarioService
    ) { }

    ngOnInit(){
      
    }

  login() {

    this._usuarioiService.login(this.loginForm.value)
      .subscribe((resp: any) => {

      

        if (this.loginForm.get('recordar').value) {
          localStorage.setItem('control', this.loginForm.get('control').value);
        } else {
          localStorage.removeItem('control');
        }

        Swal.fire('Bienvenido! ', this.loginForm.get('control').value, 'success')
        this.router.navigateByUrl('/api/dashboard');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })

  }
}
