import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { WebsocketService } from 'src/app/servicios/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {
  nombre: any[] = [];

  constructor( private _usuarioService: UsuarioService,
                private  router: Router,
                public _wsService: WebsocketService) { }


  logout(){
    this._usuarioService.logout();
  }

  buscar( termino: string){
  
    if( termino.length === 0){
      return;
      
    }

    this.router.navigateByUrl(`/api/buscar/${termino}`);
  }

  datos(){
    this.nombre = this._usuarioService.usuario.nombre.split(" ",2);
  }


}
