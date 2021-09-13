import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocsService } from 'src/app/servicios/documentos.service';
import { FileUploadService } from 'src/app/servicios/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styles: [
  ]
})
export class FileUploadComponent implements OnInit {
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  public formSubmitted = false;
  public pdfSubir: File;
  id:string;
  public validarPDF: any;
  
  public formSubirPDF = this.fb.group({
    dirDoc: ['', Validators.required]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _docService: DocsService,
    private _fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.id = this._docService.id;
  }

  closeModal( $event ){
    this.router.navigate([{ outlets: { modal: null }}]);
    this.modalClose.next( $event );
  }

  validarImagen(file: File){
this.pdfSubir = file;
this.validarPDF = this.pdfSubir.name.split('.');
//console.log(this.validarPDF[this.validarPDF.length -1]);
if( this.validarPDF[this.validarPDF.length -1] != 'pdf'){
  Swal.fire('Error','Debes seleccionar un PDF valido', 'error');
  //this.closeModal('cerrar');
}
  }

  subirPDF(){   
    
 this._fileUploadService.actualizarPDF( this.pdfSubir,this.id).then( pdf => console.log(pdf));
 Swal.fire('Tu PDF se subio con exito','OK', 'success');
 this.closeModal('cerrar');
 
  }
}
