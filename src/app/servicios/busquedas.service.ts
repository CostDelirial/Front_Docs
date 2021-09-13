import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  busquedaTotal(termino: string){
    const url = `${base_url}/busqueda/${termino}`;
    return this.http.get(url, this.headers);
  }
}
