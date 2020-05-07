import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.css']
})
export class FishComponent implements OnInit {

  constructor() { }

  @Input() left_pos: number;
  @Input() top_pos: number;
  @Input() idle_depth: number; //this is the depth that an idle fish will travel to
  @Input() fish_type: number;
  _fish_type: number;
  
  direction: number;
  frame_count: number; //memory leek issue??
  oscilation: number;
  width:number;
  height:number;
  size:number;
  turn: boolean; //will the fish turn?

  speed:number;
  vigorous_speed:number; //how fast the fish goes when motivated

  //related to feeding
  has_target: boolean;
  @Input() target_top: number;
  @Input() target_left: number;
  @Input() tank_width: number;
  @Output() gotFood = new EventEmitter<boolean>();
  //color_var: string;

  private eventsSubscription: Subscription;

  @Input() events: Observable<number[]>;

  ngOnInit() {
    this._fish_type = this.fish_type;
    this.speed = Math.random()*2+2;
    this.vigorous_speed = Math.random()*3+5;
    this.has_target = false;
    this.target_top = 0;
    this.target_left = 0;
    this.determineSize();
    this.oscilation = 0;
    this.frame_count = 0;
    this.direction = 1;
    this.turn = false;
    this.eventsSubscription = this.events.subscribe((f_loc:number[]) => this.seeFood(f_loc));
    this.update();
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  determineSize(){
    let size:number;

    if(this.tank_width > 1079){
      size = 80 + Math.floor(Math.random()*40);
    }else if( this.tank_width > 599 ){
      size = 60 + Math.floor(Math.random()*30);
    }else{
      size = 40 + Math.floor(Math.random()*20);
    }

    this.size = size;
    this.width = size;
    this.height = size;
  }

  seeFood(f_loc){
    this.target_top = f_loc[1];
    this.target_left = f_loc[0];
    this.has_target = true;
  }

  targetDistance(x1:number, y1:number, x2:number, y2:number){
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1 - y2, 2));
  }

  moveToTarget(){
    if( this.left_pos > this.target_left && this.direction == 1){
      this.turn = true;
    }else if( this.left_pos < this.target_left && this.direction == -1 ){
      this.turn = true;
    }

    if( this.top_pos > this.target_top ){
      this.top_pos -= this.speed;
    }
    
    if( this.top_pos < this.target_top ){
      this.top_pos += this.speed;
    }
  }

  idleMotion(){
    if( this.left_pos > this.tank_width - this.size*1.2 && this.direction == 1){
      this.turn = true;
    }else if( this.left_pos < this.size*0.6 && this.direction == -1 ){
      this.turn = true;
    }

    if( this.top_pos < this.idle_depth - 10){
      this.top_pos += this.speed/2;
    }else if(this.top_pos > this.idle_depth + 10){
      this.top_pos -= this.speed/2;
    }
  }

  moveFish(vigorous_bool:boolean){
    if(vigorous_bool){
      this.left_pos += this.vigorous_speed*this.direction;
      this.oscilation = 10*Math.sin(0.03*this.vigorous_speed*this.frame_count);
    }else{
      this.left_pos += this.speed*this.direction;
      this.oscilation = 10*Math.sin(0.03*this.speed*this.frame_count);
    }
    this.turnFish();
  }

  update(){
    setInterval(() => {
      this.frame_count += 1;
      if( this.has_target ){ //fish sees food
       this.moveToTarget();
       this.moveFish(true);
       let dist:number = this.targetDistance(this.left_pos, this.top_pos, this.target_left, this.target_top);
       if(dist < 30){
        this.gotFood.emit(true);
        this.has_target = false;
       }

      }else{ //default movement state
        this.idleMotion();
        this.moveFish(false);
      }
      
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

    if(this.width < this.size && this.turn == false){ //finish turn
      this.width += 10;
      if(this.width > this.size){
        this.width = this.size;
      }
    }
  }

  updateStyles() {
    let styles = {
      'left': `${this.left_pos}px`,
      'top': `${this.top_pos + this.oscilation}px`,
      'transform': `scaleX(${this.direction}`,
      'width': `${this.width}px`,
      'height': `${this.height}px`
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

