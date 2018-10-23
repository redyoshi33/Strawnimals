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
  session: any;
  loggedIn: any;

  ngOnInit() {
    this.session = this._httpservice.checkSession()
    this.loggedIn = this.session['login']
    if(!this.loggedIn){
      this._router.navigate(['/store'])
    }
  	this._route.params.subscribe((params: Params) => this.id = params['id'])
  	this.fetchOrder(this.id)
  }
  fetchOrder(id){
  	let obs = this._httpservice.getOrder(id)
	  	obs.subscribe(data => {
	  		this.order = data
	  		this.items = data['items']
	  		this.subtotal = this.findSubTotal(this.items)
        this.shipping = data['shippingPrice'];
	  		this.getStyles()
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
  	if(this.order.status === "Shipped"){
  		this.background = "#AFE7BB"
  	}
  	else if(this.order.status === "Order in process"){
  		this.background = "#ffd86b"
  	}
  	else if(this.order.status === "Cancelled"){
  		this.background = "#FEDCD2"
  	}
  	this.myStyle = {'background': this.background }
  }
}
