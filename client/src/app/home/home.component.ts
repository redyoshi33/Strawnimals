import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
  	private _route: ActivatedRoute,
	  private _router: Router,
	  private _httpservice: HttpService,
    private config: NgbCarouselConfig,
	) { 
    // config.interval = 3000
  }

  orders: any;
  firstSlide: any;
  secondSlide: any;
  thirdSlide: any;

  ngOnInit() {
    this.fetchPopular()
  }
  fetchPopular(){
    let obs = this._httpservice.getPopular()
      obs.subscribe(data => {
        this.orders = data
        if(this.orders.length > 8){
          this.thirdSlide = this.orders.slice(6,9)
        }
        if(this.orders.length > 5){
          this.secondSlide = this.orders.slice(3,6)
        }
        if(this.orders.length > 2){
          this.firstSlide = this.orders.slice(0,3)
        }
        else{
          this.firstSlide = this.orders.slice(0,this.orders.length)
        }
    })
  }
}
