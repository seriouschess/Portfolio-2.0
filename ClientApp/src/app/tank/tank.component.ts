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
  number_of_fish_types: number;
  all_fish: fish[];

  constructor(private element:ElementRef) { }

  ngOnInit() {
    this.number_of_fish_types = 4; //types 1, 2, 3 or 4
    this.tank_width = this.element.nativeElement.offsetWidth;
    this.tank_height = this.element.nativeElement.offsetHeight; //used to pace fish
    console.log("Height: "+this.element.nativeElement.offsetHeight);
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
    this.food_top = event.pageX-15; //adjust for food image
    this.food_left = event.pageY-25;
    this.emitEventToChild(this.food_top, this.food_left);
  }

  foodEaten(){
    this.food_out = false;
  }

  decideType(){
    let rand = Math.floor( Math.random()*100);
    if( rand%20 == 0 ){ //angel fish
      return 3;
    }else if( rand%12 == 0 ){ //butterfly fish
      return 4;
    }else if( rand%5 == 0){ //disk fish
      return 2;
    }else{ //yellow fish
      return 1;
    }
  }

  createFish(){
    this.all_fish = [];
    let h = this.sky_height;
    for(let x=0; x < 3; x++){ //create top cluster
      let fish:fish = {
        starting_depth: h + 250 + Math.floor( Math.random()*50 ),
        starting_left: Math.floor( Math.random()*(this.tank_width-100)+50 ),
        idle_depth: 100 + Math.floor(Math.random()*100 ),
        type: this.decideType()
      }
      this.all_fish.push(fish);
    }

    for(let x=0; x < 3; x++){ //create middle cluster
      let set_depth = 1050 + Math.floor( Math.random()*300 );
      let fish:fish = {
        starting_depth: h + set_depth,
        starting_left: Math.floor( Math.random()*(this.tank_width-100)+50 ),
        idle_depth: set_depth,
        type: this.decideType()
      }
      this.all_fish.push(fish);
    }

    for(let x=0; x < 8; x++){ //random roaming fish
      let set_depth = 200 + Math.floor( Math.random()*(this.tank_height-h - 600) );
      let fish:fish = {
        starting_depth: h + set_depth,
        starting_left: Math.floor( Math.random()*(this.tank_width-100)+50 ),
        idle_depth: set_depth,
        type: this.decideType()
      }
      this.all_fish.push(fish);
    }

    if(this.tank_width < 3000){
      let fish:fish = { //create angler fish
        starting_depth: h + this.tank_height - 500,
        starting_left: Math.floor( Math.random()*(this.tank_width-100)+50 ),
        idle_depth: this.tank_height - 750,
        type: 10
      }
      this.all_fish.push(fish);
    }
  }

  emitEventToChild(x:number, y:number) {
    this.eventsSubject.next([x,y]);
  }

  openLink(link:string){
    window.open(link, "_blank");
  }
}

interface fish {
  starting_depth: number,
  starting_left: number,
  idle_depth: number,
  type: number
}
