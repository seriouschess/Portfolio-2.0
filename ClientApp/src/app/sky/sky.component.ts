import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.css']
})
export class SkyComponent implements OnInit {



  pool_rate: number; //How fast the sky disappears
  @Output() imGone = new EventEmitter<boolean>();
  @Input() sky_height: number;
  rain_drop_location_array:number[];
  @Input() sky_width:number;

  pool_acceleration;

  constructor( ) { }

  ngOnInit() {
    this.pool_acceleration = 1;
    let fifth_section = Math.floor(this.sky_width/5);

    this.rain_drop_location_array = [ 
      fifth_section,
      2*fifth_section,
      3*fifth_section,
      4*fifth_section,
      5*fifth_section,
    ];
    console.log(this.rain_drop_location_array);
    this.determinePoolRate();
    this.update();
  }

  update(){
    setInterval(() => {
      if(this.sky_height > 250){
        this.sky_height -= this.pool_rate;
      }else{
        if( this.sky_height > 0 ){
          this.pool_acceleration += 0.08;
          this.sky_height -= this.pool_rate*this.pool_acceleration;
        }else{
          this.imGone.emit(true);
        }
      }
    },60);
   }

   updateStyles(){
    let styles = {
      height: `${this.sky_height}px`
    };
    return styles;
  }

  determinePoolRate(){
    if(this.sky_height > 1080){
      this.pool_rate = 5;
    }else if(this.sky_height > 700){
      this.pool_rate = 4;
    }else{
      this.pool_rate = 3;
    }
  }
}
