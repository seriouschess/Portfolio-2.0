import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.css']
})
export class TankComponent implements OnInit {

  @Input() sky_height: number; //starting height of the sky
  food_out: boolean; //determines if food has been placed
  food_top: number;
  food_left: number;
  eventsSubject: Subject<number[]> = new Subject<number[]>();
  tank_width: number;
  tank_height: number;
  fish_starting_depth:number;
  number_of_fish_types: number;
  all_fish: fish[];

  constructor(private element:ElementRef) { }

  ngOnInit() {
    this.number_of_fish_types = 2;
    this.tank_width = this.element.nativeElement.offsetWidth;
    this.fish_starting_depth = this.sky_height + Math.floor(Math.random()*50);
    console.log("Starting Depth: " + this.fish_starting_depth);
    this.food_out = false;
    this.createFish(); 
    this.update();
   }

   update(){
    setInterval(() => {
      this.tank_width = this.element.nativeElement.offsetWidth;
    },5000);
   }

  baitFish(event){
    // var x = event.x;
    // var y = event.y;
    // var offsetX = event.offsetX;
    // var offsetY = event.offsetY;
    // console.log(event, x, y, offsetX, offsetY);
    this.food_out = true;
    this.food_top = event.x;
    this.food_left = event.y;
    this.emitEventToChild(this.food_top, this.food_left);
  }

  foodEaten(){
    this.food_out = false;
  }

  createFish(){
    this.all_fish = [];
    for(let x=0; x < 5; x++){
      let fish:fish = {
        starting_depth: this.sky_height + Math.floor(Math.random()*50),
        starting_left: Math.floor(Math.random()*(this.tank_width-100)+50),
        idle_depth: Math.floor(Math.random()*400) + x*Math.floor(Math.random()*100),
        type: Math.floor(Math.random()*this.number_of_fish_types + 1)
      }
      this.all_fish.push(fish);
    }
  }

  emitEventToChild(x:number, y:number) {
    this.eventsSubject.next([x,y]);
  }
}

interface fish {
  starting_depth: number,
  starting_left: number,
  idle_depth: number,
  type: number
}
