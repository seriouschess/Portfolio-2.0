import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rain-drop',
  templateUrl: './rain-drop.component.html',
  styleUrls: ['./rain-drop.component.css']
})
export class RainDropComponent implements OnInit {

  @Input() sky_height: number;
  @Input() starting_left: number;
  left_pos:number;
  top_pos:number;
  delay:number;

  constructor() { }

  ngOnInit() {
    this.left_pos = this.starting_left;
    this.top_pos = -100;
    this.delay = Math.random()*60;
    this.update();
  }

  update(){
    let counter = 0;
    setInterval(() => {
      if(this.delay > counter){
        counter += 1;
      }else{
        if(this.sky_height > 250 ){ //sky tall enough for rain
          if(this.left_pos > 5){
            this.left_pos -= 15;
          }else{
            this.left_pos = this.starting_left ;
          }
          
          if(this.top_pos < this.sky_height-100){ //rain fell to surface
            this.top_pos += 34;
          }else{
            this.top_pos = 0;
            let new_left = Math.floor(Math.random()*200);
            let random_bool = Math.random() >= 0.5;
            if(random_bool){
              this.left_pos = this.starting_left+new_left;
            }else{
              this.left_pos = this.starting_left-new_left;
            }
            
          }
        }else{ //hide rain
          this.left_pos = -100;
          this.top_pos = 0;
        }
      }
    },30);
  }

  updateStyles() {
    let styles = {
      'left': `${this.left_pos}px`,
      'top': `${this.top_pos}px`
    };

    return styles;
  } 

}
