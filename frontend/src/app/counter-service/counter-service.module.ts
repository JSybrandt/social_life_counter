import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';

export class PlayerState {
  constructor(public name: string, public life: number){}
}

export class GameState {
  constructor(public players: PlayerState[]){}
}

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private socket = io("http://localhost:3000");

  join(name:string){
    this.socket.emit("join", {"name": name});
  }

  leave(){
    this.socket.emit("leave");
  }

  modifyHealth(delta: number){
    this.socket.emit("modify_health", {"delta": delta});
  }

  updateName(name: string){
    this.socket.emit("update_name", {"name": name});
  }

  update() {
    return new Observable<GameState>(observer => {
      this.socket.on('update', (gameState => {observer.next(gameState)}));
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
