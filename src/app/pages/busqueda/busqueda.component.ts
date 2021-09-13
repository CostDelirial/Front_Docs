import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from 'src/app/servicios/busquedas.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: []
})
export class BusquedaComponent implements OnInit {

  public docs: any [] = [];
  public role = this._usuarioService.usuario.role;
  termino: string;

  constructor( private activateRoute: ActivatedRoute,
                private _busquedaService: BusquedasService,
                private _usuarioService: UsuarioService
                ) { 

                }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( ({ termino }) => this.busquedaGlobal(termino));

  }

  busquedaGlobal(termino: string ){
    this.termino = termino;
    this._busquedaService.busquedaTotal(termino).subscribe( (resp: any ) => {
      this.docs = resp.documentos;
      console.log(this.docs);
    })
  }

  imprimir(){
    this.busquedaGlobal( this.termino );
  }
}
