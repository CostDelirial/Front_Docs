import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { DetonanteForm } from '../modales/interfaces/detonante';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class DocsService {

  id: string;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  constructor(private http: HttpClient) { }



  cargarDocs() {
    const url = `${base_url}/docs`;
    return this.http.get(url, this.headers);
  }
  
  ////////////////////////////////////////////////
  //     consultar docs por estatus
  ////////////////////////////////////////////////
  cargarDocsEstatus(estatus: string) {
    const url = `${base_url}/docs/estatus/${estatus}`;
    return this.http.get(url);
  }
  ////////////////////////////////////////////////
  //     guardar detonante de documento
  ////////////////////////////////////////////////
  guardarDetonante(formData: DetonanteForm) {
    const url = `${base_url}/docs`;
    return this.http.post(url, formData, this.headers);
  }
  ///////////////////////////////////////////////
  //    cargar Respuesta en Documento
  //////////////////////////////////////////////
  respuestaDocumento(_id: string, formData: any) {
    const url = `${base_url}/docs/${_id}`;
    return this.http.put(url, formData , this.headers)
  }
  ///////////////////////////////////////////////
  //    validar document
  //////////////////////////////////////////////
  validarDocumento(_id: string, formData: any){
  
    const url = `${base_url}/docs/valid/${_id}`;
    return this.http.put(url, formData, this.headers);
  }
   ///////////////////////////////////////////////
  //    cargar documento por id
  //////////////////////////////////////////////
  cararDocId(id: string){
    const url = `${base_url}/docs/${id}`;
    return this.http.get(url);
  }

  ///////////////////////////////////////////////
  //    limpiar id en cache del modal 
  //////////////////////////////////////////////
  setearId( id: string){
    this.id = id;
  }
}
