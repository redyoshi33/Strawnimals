import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-showorder',
  templateUrl: './showorder.component.html',
  styleUrls: ['./showorder.component.css']
})
export class ShoworderComponent implements OnInit {

  constructor(
  	private _route: ActivatedRoute,
	private _router: Router,
	private _httpservice: HttpService,
	) { }

  id: any;
  order: any;
  items: any;
  subtotal: any;
  shipping: any;
  background: any;
  myStyle: any;

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => this.id = params['id'])
  	this.fetchOrder(this.id)
  	this.shipping = 3.33;
  }
  fetchOrder(id){
  	let obs = this._httpservice.getOrder(id)
	  	obs.subscribe(data => {
	  		this.order = data
	  		this.items = data['items']
	  		this.subtotal = this.findSubTotal(this.items)
	  		this.getStyles()
	  		console.log(this.myStyle)
	  })
  }
  findSubTotal(items){
  	let total = 0
  	for(let i=0; i<items.length; i++){
  		total += items[i].price * items[i].quantity
  	}
  	return total
  }
  getStyles(){
  	console.log(this.order.status)
  	if(this.order.status === "Shipped"){
  		this.background = "#1DA462"
  	}
  	else if(this.order.status === "Order in process"){
  		this.background = "#FFCD46"
  	}
  	else if(this.order.status === "Cancelled"){
  		this.background = "#DD5144"
  	}
  	this.myStyle = {'background': this.background }
  }
}
