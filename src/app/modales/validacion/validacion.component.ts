import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocsService } from 'src/app/servicios/documentos.service';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styles: [
  ]
})
export class ValidacionComponent implements OnInit {
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  public formSubmitted = false;
  

  edicion: false;
  id:string;
  did: string;
  

public formValidacion = this.fb.group({
  depto: ['',Validators.required],
  supervisor: [''],
  administrador: ['',Validators.required],
  estatus:['', Validators.required],
})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _docService: DocsService
  ) { 
   
  }

  ngOnInit(): void {
    this.id = this._docService.id;
    if( this.id != null){
      this.cargarDocId();
    }
    
  }


  closeModal( $event ){
    this.router.navigate( [ { outlets: { modal: null } } ] );
    this._docService.id = null;
    this.modalClose.next( $event ); 
  }

  cargarDocId(){
    this._docService.cararDocId(this.id).subscribe( ( resp: any) => {
      const validador = resp.documento;
      this.did = validador._id;
      
      this.formValidacion.get('depto').setValue(validador.depto);
      this.formValidacion.get('supervisor').setValue(validador.supervisor);
      this.formValidacion.get('administrador').setValue(validador.administrador);
      this.formValidacion.get('estatus').setValue( validador.estatus );

    })
  }

  validarDoc(){
    
    this.formSubmitted = true;
    
    if( this.formValidacion.invalid){
      return;
    }
    this._docService.validarDocumento(this.did, this.formValidacion.value)
    .subscribe( ( resp: any ) =>{
      Swal.fire(resp.docValidacion.folioSSE,'La validación fue creada', 'success');
      this.formValidacion.reset();
      this.closeModal('cerrar');
    }, (err) => {
      Swal.fire('Error', err.error.msg,'error');
    })
  }

  campoNoValido( campo: string): boolean{
    if( this.formValidacion.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  limpiarForm(){
    this.formValidacion.reset();
  }

}
