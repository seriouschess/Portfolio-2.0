import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-fish-food',
  templateUrl: './fish-food.component.html',
  styleUrls: ['./fish-food.component.css']
})
export class FishFoodComponent implements OnInit {

  left_pos:number;
  top_pos:number;

  @Input() hide_food:boolean;

  private eventsSubscription: Subscription;

  @Input() events: Observable<number[]>;

  constructor() { }

  ngOnInit() {
    console.log("me");
    this.left_pos = 500;
    this.top_pos = 500;
    this.eventsSubscription = this.events.subscribe((f_loc:number[]) => this.place(f_loc));
    this.update();
  }

  update(){
    setInterval(() => {
      if(this.hide_food){
        this.hide();
      }
    },50);
  }



  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  place(f_loc: number[]): void {
    console.log("doe");
    this.left_pos = f_loc[0];
    this.top_pos = f_loc[1]; 
  }

  hide(){
    this.left_pos = -500;
  }

  updateStyles(){
    console.log("ray");
    let styles = {
      'left': `${this.left_pos}px`,
      'top': `${this.top_pos}px`
    };
    return styles;
  }

}
