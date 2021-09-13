import { Component } from '@angular/core';
import { DocsService } from 'src/app/servicios/documentos.service';
import { ModalesIsService } from 'src/app/servicios/modales.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-en-revision',
  templateUrl: './en-revision.component.html',
  styles: [
  ]
})
export class EnRevisionComponent {

  
  public docs: any []=[];
  public dia = new Date();
  public role = this._usuarioService.usuario.role;


  constructor( private _docService: DocsService,
                private _eventModal: ModalesIsService,
                private _usuarioService: UsuarioService) {
this.cargarDocsEnRevision();
   }

   cargarDocsEnRevision(){

     this._docService.cargarDocsEstatus('en revision').subscribe( ( resp: any ) => {
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
