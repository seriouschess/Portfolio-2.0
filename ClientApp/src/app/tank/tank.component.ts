import { Component, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.css']
})
export class TankComponent implements OnInit {

  food_out: boolean; //determines if food has been placed
  food_top: number;
  food_left: number;
  eventsSubject: Subject<number[]> = new Subject<number[]>();
  tank_width:number;
  tank_height:number;

  constructor(private element:ElementRef) { }

  ngOnInit() {
    this.tank_width = this.element.nativeElement.offsetWidth;
    this.food_out = false; 
    this.update();
   }

   update(){
    setInterval(() => {
      this.tank_width = this.element.nativeElement.offsetWidth;
    },5000);
   }

  baitFish(event){
    this.food_out = true;
    var x = event.x;
    var y = event.y;
    var offsetX = event.offsetX;
    var offsetY = event.offsetY;
    console.log(event, x, y, offsetX, offsetY);
    this.food_top = event.x;
    this.food_left = event.y;
    this.emitEventToChild(this.food_top, this.food_left);
  }

  foodEaten(){
    this.food_out = false;
  }

  emitEventToChild(x:number, y:number) {
    this.eventsSubject.next([x,y]);
  }
}
