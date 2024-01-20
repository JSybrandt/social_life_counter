import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private socket = io("http://localhost:3000");

  ping(){
    this.socket.emit("ping", {'text': 'ping'});
  }

  pong() {
    return new Observable<{text:string}>(observer => {
      this.socket.on('pong', (data=> {observer.next(data)}));
      return () => { this.socket.disconnect(); };
    });
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CounterServiceModule { }
