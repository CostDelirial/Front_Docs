import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { DocsService } from 'src/app/servicios/documentos.service';
import { emit } from 'process';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styles: [
  ]
})
export class ArchivoComponent implements OnInit {
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  public formSubmitted = false;

public ArcNewForm = this.fb.group({
  fecha:['', Validators.required],
  expediente:['',Validators.required, Validators.minLength(3)],
  documento:['',Validators.required],
  folioSSE:['', Validators.required],
  asunto:['',Validators.required],
  numeroGESSM: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(4)]],
  numeroSSM: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(4)]],
  numeroSSS: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(4)]],
  atencionAcuerdo:['', Validators.required],
  areaResponsable:['', Validators.required],
})

  action = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _docService: DocsService

  ) { }

  ngOnInit(): void {
  }

  closeModal( $event ){
    this.router.navigate([{ outlets: { modal: null }}]);
    this.modalClose.next( $event );
  }

  registarFormulario(){
    this.formSubmitted = true;
    if( this.ArcNewForm.invalid){
      return;
    }

    //realizar la creacion del formulario del documento
    this._docService.guardarDetonante(this.ArcNewForm.value).subscribe( ( resp: any ) => {
      const folio = resp.docs;
      Swal.fire(folio.folioSSE,'Se registro con exito, ahora asignale un documento','success');
      this.ArcNewForm.reset();
      this.closeModal('cerrar');
    }, ( err) => {
      Swal.fire('Error', err.error.msg,'error');
    })
  
    
  }

  campoNoValido( campo: string): boolean{
    if( this.ArcNewForm.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }


  limpiarForm(){
    this.ArcNewForm.reset();
  }
  
}
