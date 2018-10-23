import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpservice: HttpService,
  ) { }

  session: any;
  loginID: any;
  orders: any;
  
  ngOnInit() {
    this.session = this._httpservice.checkSession()
    this.loginID = this.session['login']
    if(!this.loginID){
      this._router.navigate(['/store'])
    }
    else{
      this.fetchOrders(this.loginID)
    }
    
  }
  fetchOrders(userID){
    let obs = this._httpservice.getUserOrders(userID)
      obs.subscribe(data => {
        this.orders = data
      })
  }
  totalOfItem(order){
    let total = order['shippingPrice']
    for(let i = 0; i<order['items'].length; i++){
      total += order['items'][i]['price']*order['items'][i]['quantity']
    }
    return total.toFixed(2)
  }
}
