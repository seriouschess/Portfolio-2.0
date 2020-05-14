import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document: Document){ }
  sky_done:boolean;
  sky_height: number;
  width:number; //home component width

  ngOnInit(){
    this.sky_done = false;
    this.width = this.document.getElementById("SPACE").offsetWidth;
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
