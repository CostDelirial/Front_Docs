import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocsService } from 'src/app/servicios/documentos.service';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: []
})
export class RespuestaComponent implements OnInit {
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  public formSubmitted = false;
  public fechas =  new Date();

  
  id:string;
  
  public formRespuesta = this.fb.group({
    respuesta: ['', Validators.required],
    numeroResultado: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(4)]],
    fechaResultado: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _docService: DocsService
  ) { }

  ngOnInit(): void {
    this.id = this._docService.id;
  }

  closeModal( $event ){
    this.router.navigate( [ { outlets: { modal: null } } ] );
    this._docService.id = null;
    this.modalClose.next( $event ); 
  }

  darRespuestaDoc(){
    this.formSubmitted = true;
    if( this.formRespuesta.invalid ){
      return;
    }
    this._docService.respuestaDocumento(this.id,this.formRespuesta.value)
    .subscribe( ( resp: any ) => {
      Swal.fire(resp.docResultado.folioSSE,'La respuesta al Documento se actualizo con exito','success');
      this.formRespuesta.reset();
      this.closeModal('cerrar');
    }, ( err ) => {
    Swal.fire('Error', err.error.msg,'error');
    })
    
  }
  campoNoValido( campo: string): boolean{
    if( this.formRespuesta.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  limpiarForm(){
    this.formRespuesta.reset();
  }
}
