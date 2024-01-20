import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CounterService, GameState} from '../counter-service/counter-service.module'

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  providers: []
})
export class CounterComponent implements OnInit {
  constructor(private counterService:CounterService){}

  joined: boolean = false
  gameState: GameState|undefined;
  playerName: string = "New Player"

  ngOnInit() {
    this.counterService.update().subscribe((gameState)=>{
      this.gameState = gameState
    })
  }

  onJoin(){
    this.counterService.join(this.playerName);
    this.joined = true
  }
  onLeave(){
    if(!this.joined) return;
    this.counterService.leave();
    this.joined = false;
  }
  onPlusOne(){
    if(!this.joined) return;
    this.counterService.modifyHealth(+1);
  }
  onMinusOne(){
    if(!this.joined) return;
    this.counterService.modifyHealth(-1);
  }
  onNameChange(){
    if(!this.joined) return;
    this.counterService.updateName(this.playerName);
  }

}
