import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _background_home_bg:string;

  constructor() {
    this._background_home_bg = 'https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/b1225a16-f739-4628-9115-fd0ae8f61e16/SN-en-20220808-popsignuptwoweeks-perspective_alpha_website_large.jpg';

   }

   public get background_home_bg():string {
      return this._background_home_bg;
    }

  ngOnInit(): void {
  }

}
