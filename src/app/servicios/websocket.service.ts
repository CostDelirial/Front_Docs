import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client/build/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
public socketStatus = false;
private socket: Socket;

  constructor() { 
this.socket = io(environment.wsURL);
this.checkStatus();

  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('conectado al servidor de sockest')

      this.socketStatus = true;
    });
    
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor de sockest');
      this.socketStatus = false;
    });
  
  }

  emit( evento: string, payload?: any, callback?:any ){
    //emit('EVENTO',payload,callback?)
    this.socket.emit( evento, payload, callback);
  }




}


