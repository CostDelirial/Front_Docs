import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalesIsService } from './servicios/modales.service';
import { WebsocketService } from './servicios/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Docs';
  public socketStatus = false;

  constructor(
    private _eventModal: ModalesIsService,
    private router: Router,
    public  _wsService: WebsocketService
  ){
    
  }

  ngOnInit(): void {
    this._eventModal.eventosModal.subscribe( ( data ) => {
      this.router.navigate([{ outlets: { modal: data }}]);
    })
  }


}
