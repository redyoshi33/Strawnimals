import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _httpservice: HttpService,
  	) { }

  cart: any;
  session: any;
  loggedIn: any;
  admin: any;

  ngOnInit() {
  	this._httpservice.cart.subscribe( data => {
  		this.cart = data
  	})
    this._httpservice.session.subscribe( data => {
      this.session = data
      this.loggedIn = data['login']
      this.admin = data['admin']
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
