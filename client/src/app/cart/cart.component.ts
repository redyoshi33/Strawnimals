import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
  	private _route: ActivatedRoute,
	  private _router: Router,
	  private _httpservice: HttpService,
  ) { }

  cart: any;
  sessionID: any;
  totalOrder: any;
  message: string;
  shipfname: string;
  shiplname: string;
  shipaddress: string;
  shipaddress2: string;
  shipcity: string;
  shipstate: string;
  shipzip: number;
  phone: string;

  billfname: string;
  billlname: string;
  billaddress: string;
  billaddress2: string;
  billcity: string;
  billstate: string;
  billzip: number;
  billcard: number;
  billsecruity: number;
  monthexp: number;
  yearexp: number;

  checked: boolean;
  date: any;
  id: number;
  shippingPrice: number;

  ngOnInit() {
  	this.message = ""
  	this._httpservice.cart.subscribe( data => {
      this.cart = data
      this.calculateShipping()
      this.totalOrder = this.totalofOrder(this.cart)
    })
    this._httpservice.session.subscribe( data => {
      this.sessionID = data['login']
    })
    this.checked = false
    this.date = new Date()
    this.id = 1
  }
  updateItem(order, param){
  	this.message = ""
  	if(param === "-"){
  		if(order['quantity']>1){
  			--order['quantity']
  		}
  		else{
  			this.removeItem(order)
  		}
  	}
  	else if(param === "+"){
  		if(order['quantity']<order['maximum']){
  			++order['quantity']
  		}
  		else{
  			this.message = "Can't add any more to quantity."
  		}
  	}
  	this.calculateShipping()
  	this.totalOrder = this.totalofOrder(this.cart)
  }
  removeItem(order){
  	let index = this.cart.indexOf(order)
  	this.cart.splice(index ,1)
  	this.totalOrder = this.totalofOrder(this.cart)
  }
  totalOfItem(order){
  	let total = order['price']*order['quantity']
	return total.toFixed(2)
  }
  totalofOrder(cart){
  	let total = this.shippingPrice
  	for(let i = 0; i<cart.length; i++){
  		total += cart[i]['price']*cart[i]['quantity']
  	}
  	return total
  }
  validateOrder(){
  	this.date = new Date();
  	if(!this.shipfname || !this.shiplname || !this.shipaddress || !this.shipcity || !this.shipstate || !this.shipzip || !this.billfname || !this.billlname || !this.billaddress || !this.billcity || !this.billstate || !this.billzip || !this.billcard || !this.billsecruity || !this.monthexp || !this.yearexp){
  		this.message = "Fill out all required forms."
  	}
  	else if(this.monthexp < 0 || this.monthexp > 12 || (this.yearexp < this.date.getFullYear()) && this.monthexp < this.date.getMonth()){
  		this.message = "Please use a valid card for payment."
  	}
  	else if(this.cart.length < 1){
  		this.message = "The cart is empty."
  	}
  	else{
  		let obs = this._httpservice.getOrders()
	  	obs.subscribe(data => {
	  		if(data['length'] > 0){
	  			this.id = data[data['length']-1]['id'] + 1
	  		}
	  		let shipaddress = this.shipaddress
	  		if(this.shipaddress2){
	  			shipaddress += ", "+this.shipaddress2
	  		}
	  		let billaddress = this.billaddress
	  		if(this.billaddress2){
	  			billaddress += ", "+this.billaddress2
	  		}
        if(!this.sessionID){
          this.sessionID = ""
        }
	  		let order = {
	  			'id': this.id, 
	  			'name': this.shipfname + " " + this.shiplname,
	  			'date': this.formatDate(),
	  			'phone': this.phone,
	  			'shipping': {'address': shipaddress,'city': this.shipcity,'state': this.shipstate,'zip': this.shipzip},
	  			'billing': {'address': billaddress,'city': this.billcity,'state': this.billstate,'zip': this.billzip},
	  			'items': this.cart,
	  			'status': "Order in process",
	  			'shippingPrice': this.shippingPrice,
          'total': this.totalOrder,
          'userID': this.sessionID
	  		}
	  		let obs1 = this._httpservice.submitOrder(order)
	  		obs1.subscribe(data => {
	  			this._httpservice.clearCart()
	  			this.message = "Order Submitted! Redirecting back to the store."
          setTimeout(() => {
            this._router.navigate(['/store'])
          }, 2000)
	  		})
	 	 })
  	}
  }
  sameShipping(){
  	if(!this.checked){
  		this.checked = true
  		this.billfname = this.shipfname 
  		this.billlname = this.shiplname 
  		this.billaddress = this.shipaddress
  		this.billaddress2 = this.shipaddress2
  		this.billcity = this.shipcity
  		this.billstate = this.shipstate 
  		this.billzip = this.shipzip
  	}
  	else if(this.checked){
  		this.checked = false
  	}
  }
  calculateShipping(){
  	let number = 0
  	for(let i = 0; i<this.cart.length; i++){
  		number += this.cart[i].quantity
  	}
  	if(number==0){
  		this.shippingPrice = 0.00
  	}
  	else if(number<4){
  		this.shippingPrice = 2.30
  	}
  	else if(number<7){
  		this.shippingPrice = 3.40
  	}
  	else if(number<10){
  		this.shippingPrice = 4.50
  	}
  	else{
  		this.shippingPrice = 6.70
  	}
  }
  formatDate(){
  	let dd = this.date.getDate()
  	let mm = this.date.getMonth()+1
  	let yyyy = this.date.getFullYear()
  	if(dd < 10){
      dd= '0' + dd;
	} 
	if(mm<10){
      mm= '0' + mm;
	} 
	return mm+'/'+dd+'/'+yyyy
  }
}
