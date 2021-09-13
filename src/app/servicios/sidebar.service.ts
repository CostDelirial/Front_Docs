import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

public menu = [];

  cargarMenu(){
    
      this.menu = JSON.parse(localStorage.getItem('menu')) || [];
      console.log(this.menu );
  }

  /*menu: any[] = [
    { 
      titulo: 'Inicio',
      icono: 'mdi mdi-gaude',
      submenu:[
        { titulo: 'Dashboard', url:'dashboard'},
        { titulo: 'En tramite', url: 'en_tramite'},
        { titulo: 'Finalizado', url: 'finalizado'},
        { titulo: 'En revision', url: 'en_revision'},
        { titulo: 'Pendiente', url: 'pendiente'},
        { titulo: 'Rxjs', url:'rxjs' }
      ]
    },
    {
      titulo: 'Panel Admin',
      icono:'mdi mdi-hexagon-multiple',
      submenu:[ 
        {titulo: 'Usuarios', url: 'usuarios'}
       ],
    }
  ];*/
  

  constructor() { }

}
