import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.css']
})
export class TankComponent implements OnInit {

  food_top: number;
  food_left: number;
  eventsSubject: Subject<number[]> = new Subject<number[]>();

  constructor() { }

  ngOnInit() { }

  baitFish(event){
    var x = event.x;
    var y = event.y;
    var offsetX = event.offsetX;
    var offsetY = event.offsetY;
    console.log(event, x, y, offsetX, offsetY);
    this.food_top = event.x;
    this.food_left = event.y;
    this.emitEventToChild(this.food_top, this.food_left);
  }

  emitEventToChild(x:number, y:number) {
    this.eventsSubject.next([x,y]);
  }
}
