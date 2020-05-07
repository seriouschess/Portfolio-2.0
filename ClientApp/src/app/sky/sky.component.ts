import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.css']
})
export class SkyComponent implements OnInit {

  constructor( ) { }

  pool_rate: number; //How fast the sky disappears
  @Output() imGone = new EventEmitter<boolean>();
  @Input() sky_height: number;

  ngOnInit() {
    this.determinePoolRate();
    this.update();
  }

  update(){
    setInterval(() => {
      if( this.sky_height > 0 ){
        this.sky_height -= this.pool_rate;
      }else{
        this.imGone.emit(true);
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
