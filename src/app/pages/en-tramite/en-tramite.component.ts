import { Component } from '@angular/core';
import { DocsService } from 'src/app/servicios/documentos.service';
import { ModalesIsService } from 'src/app/servicios/modales.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-en-tramite',
  templateUrl: './en-tramite.component.html',
  styles: [
  ]
})
export class EnTramiteComponent  {

   public docs: any [] = [];
   public role = this._usuarioService.usuario.role;
  constructor( private _docService: DocsService,
    private _usuarioService: UsuarioService,
    private _eventModal: ModalesIsService,) {
this.cargarDocsEnTramite();
   }

   cargarDocsEnTramite(){
    this._docService.cargarDocsEstatus('en tramite').subscribe( ( resp: any ) => {
      this.docs = resp.documentos;
    
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
