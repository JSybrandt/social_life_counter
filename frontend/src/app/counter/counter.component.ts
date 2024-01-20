import { Component, OnInit } from '@angular/core';
import {CounterService} from '../counter-service/counter-service.module'

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  providers: []
})
export class CounterComponent implements OnInit {
  constructor(private counterService:CounterService){}

  message: string = "";

  ngOnInit() {
    this.counterService.pong().subscribe((data)=>{
      this.message = data.text;
    })
  }

  onPing(){
    this.counterService.ping();
  }

}
