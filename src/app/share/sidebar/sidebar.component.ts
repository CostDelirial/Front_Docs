import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/servicios/sidebar.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit{

  menuItems: any[];
  nombre: any[];
  constructor( public _sidebarService: SidebarService,
                private _usuarioService: UsuarioService) { 
    //this.menuItems = _sidebarService.menu;

    this.separarNombre();
    
    
                  
  }
ngOnInit():void{
  this._sidebarService.cargarMenu();
}



separarNombre(){
  this.nombre= this._usuarioService.usuario.nombre.split(" ",2);
    
}


  logout(){
    this._usuarioService.logout();
  }
 
 

}
