import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-store-navbar',
  templateUrl: './store-navbar.component.html',
  styleUrls: ['./store-navbar.component.css']
})
export class StoreNavbarComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
  	private _router: Router,
  	private _httpservice: HttpService,
  ) { }

  cart: any;
  session: any;
  loggedIn: any;

  ngOnInit() {
  	this._httpservice.cart.subscribe( data => {
  		this.cart = data
  	})
    this._httpservice.session.subscribe( data => {
      this.session = data
      this.loggedIn = data['login']
      console.log(this.session)
    })
  }
  logout(){
    this.session = ""
    this.loggedIn = ""
    let obs = this._httpservice.logoutSession()
    obs.subscribe(data => {
        this._httpservice.clearSession()
        this._router.navigate(['/login'])
      })
  }
}
