import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { inflate } from 'zlib';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.css']
})
export class FishComponent implements OnInit {

  constructor() { }

  @Input() left_pos: number;
  @Input() top_pos: number;
  direction: number;
  frame_count: number; //frame leek issue??
  oscilation: number;
  width:number;
  turn: boolean; //will the fish turn?
  speed:number;

  //related to feeding
  has_target: boolean;
  @Input() target_top: number;
  @Input() target_left: number;
  //color_var: string;

  private eventsSubscription: Subscription;

  @Input() events: Observable<number[]>;

  ngOnInit() {
    this.has_target = false;
    this.target_top = 0;
    this.target_left = 0;
    this.width = 100;
    this.oscilation = 0;
    this.frame_count = 0;
    this.direction = 1;
    this.speed = 3;
    this.turn = false;
    //this.color_var = `rgb(${0},${0},${0})`;
    this.eventsSubscription = this.events.subscribe((f_loc:number[]) => this.seeFood(f_loc));
    this.update();
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  seeFood(f_loc){
    console.log("food!");
    this.target_top = f_loc[1];
    this.target_left = f_loc[0];
    console.log(this.target_top +" "+this.target_left);
    this.has_target = true;
    this.speed = 6;
  }

  update(){
    setInterval(() => {
      // let r =  Math.floor((Math.random() * 256));
      // let g =  Math.floor((Math.random() * 256));
      // let b =  Math.floor((Math.random() * 256));
      // this.color_var =  `rgb(${r},${g},${b})`;

      this.frame_count += 1;
      if( this.has_target ){
        if( this.left_pos > this.target_left && this.direction == 1){
          this.turn = true;
        }else if( this.left_pos < this.target_left && this.direction == -1 ){
          this.turn = true;
        }

        if( this.top_pos > this.target_top + this.speed ){
          this.top_pos -= this.speed;
        }
        
        if( this.top_pos < this.target_top - this.speed ){
          this.top_pos += this.speed;
        }
      }else{
        if( this.left_pos > 800 && this.direction == 1){
          this.turn = true;
        }else if( this.left_pos < 300 && this.direction == -1 ){
          this.turn = true;
        }
      }

      this.left_pos += this.speed*this.direction;
      this.oscilation = 10*Math.sin(0.03*this.speed*this.frame_count);
      this.turnFish();
    },30);
  }

  turnFish(){
    if(this.width > 0 && this.turn == true){ //turn fish
      this.width -= 10;
    }
    
    if(this.turn == true && this.width <= 0){ //width == 0, change direction
      this.direction *= -1;
      this.turn = false;
    }

    if(this.width < 100 && this.turn == false){ //finish turn
      this.width += 10;
      if(this.width > 100){
        this.width = 100;
      }
    }
  }

  updateStyles() {
    let styles = {
      //'background-color' : this.color_var,
      'left': `${this.left_pos}px`,
      'top': `${this.top_pos + this.oscilation}px`,
      'transform': `scaleX(${this.direction}`,
      'width': `${this.width}px`
    };

    return styles;
  } 

  baitFish(event){

    var x = event.x;
    var y = event.y;
    var offsetX = event.offsetX;
    var offsetY = event.offsetY;

    //mouse data
    console.log(event, x, y, offsetX, offsetY);
  };
}

