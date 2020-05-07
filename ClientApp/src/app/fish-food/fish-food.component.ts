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

  private hide_food:boolean;
  @Input() 
  set hideFood( value:boolean ){
    this.hide_food = value;
    if(this.hide_food){
      this.hide();
    }
  }

  private eventsSubscription: Subscription;

  @Input() events: Observable<number[]>;

  constructor() { }

  ngOnInit() {
    this.hide();
    this.top_pos = 0;
    this.eventsSubscription = this.events.subscribe((f_loc:number[]) => this.place(f_loc));
    this.updateStyles();
  }



  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  place(f_loc: number[]): void {
    this.left_pos = f_loc[0];
    this.top_pos = f_loc[1]; 
  }

  hide(){
    this.left_pos = -500;
  }

  updateStyles(){
    let styles = {
      'left': `${this.left_pos}px`,
      'top': `${this.top_pos}px`
    };
    return styles;
  }

}
