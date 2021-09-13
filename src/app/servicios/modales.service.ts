import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ModalesIsService {

  @Output()
  eventosModal = new EventEmitter<any>();

  constructor(
    private router: Router
  ) { }

abrirModal( nombre: string, id?: string ){
  this.eventosModal.emit(nombre);
}

}
