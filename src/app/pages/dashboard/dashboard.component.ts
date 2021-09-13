import { Component, OnInit } from '@angular/core';
import { DocsService } from 'src/app/servicios/documentos.service';
import { ModalesIsService } from 'src/app/servicios/modales.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { WebsocketService } from 'src/app/servicios/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  public docs:any  [] =  [];
  
  public role = this._usuarioService.usuario.role;

  constructor( private _docService: DocsService,
              private _eventModal: ModalesIsService,
              private _usuarioService: UsuarioService,
              public _wsService: WebsocketService
              
              ) { 

    this.cargarDocs();
  }

  ngOnInit(){
   
  }


  verModalArchivo(nombre: string) {
    this._eventModal.abrirModal( nombre);
  }


  cargarDocs(){
    this._docService.cargarDocs().subscribe( ( resp: any) =>{
      this.docs = resp.documentos;
      console.log(this.docs);
      
    })
  }

  
respuestaDoc(did:string) {
 
 this._docService.setearId(did);
 this._eventModal.abrirModal('respuestaDoc');

}

validacionDoc(did: string){
 this._docService.setearId(did);
 this._eventModal.abrirModal('validacionDoc');
}

subirArchivo(did: string){
  this._docService.setearId(did);
  this._eventModal.abrirModal('subirArchivo');
}

}
