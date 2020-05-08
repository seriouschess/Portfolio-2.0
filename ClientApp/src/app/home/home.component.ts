import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private element:ElementRef){ }
  sky_done:boolean;
  sky_height: number;
  width:number; //home component width

  ngOnInit(){
    this.sky_done = false;
    this.width = this.element.nativeElement.offsetWidth;
    this.sky_height = this.determineSkyHeight();
  }

  isSkyDone(){
    this.sky_done = true;
  }

  determineSkyHeight():number{
    if(this.width > 1080){
      return 700;
    }else if(this.width > 700){
      return 500;
    }else{
      return 480;
    }
  }
}
