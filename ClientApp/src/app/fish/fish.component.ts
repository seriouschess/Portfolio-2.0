import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.css']
})
export class FishComponent implements OnInit {

  constructor() { }

  left_pos: number;
  color_var: string;

  ngOnInit() {
    this.left_pos = 0;
    this.color_var = `rgb(${0},${0},${0})`;
    this.update();
  }

  update(){
    setInterval(() => {
      let r =  Math.floor((Math.random() * 256));
      let g =  Math.floor((Math.random() * 256));
      let b =  Math.floor((Math.random() * 256));
      this.color_var =  `rgb(${r},${g},${b})`;
      this.left_pos += 10;
    },200);
  }

  updateStyles() {
    let styles = {
      'background-color' : this.color_var,
      'left': `${this.left_pos}px`
    };

    return styles;
} 
}

