import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent {

  constructor() { 
    this.terontaInterval()
    .subscribe( console.log)
    
    
    
    this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('Sub', valor),
      error => console.log('Error', error),
      () => console.info('Obs terminado')
    );

  }

  retornaObservable(): Observable<number>{
    const obs$ = new Observable<number>( observer => {
      let i = -1;
    
      const intervalo =  setInterval( () => {
      
        i++;
        observer.next(i);
        if ( i === 4){
          clearInterval(intervalo);
          observer.complete();
        }
        if( i === 2 ){
          i = 0;
          observer.error('i llego al valor de dos')
        }
      },1000)
    });
    return obs$;
  }

  terontaInterval(){
    const intervalo$ = interval(1000).pipe(
        take(4)
    );
    return intervalo$;
  }
}
