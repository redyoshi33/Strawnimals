import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
  	private _route: ActivatedRoute,
	private _router: Router,
	private _httpservice: HttpService,
  ) { }

  message: string;
  username: string;
  password: string;
  name: string;
  newusername: string;
  newpassword: string;
  confirmpassword: string;

  ngOnInit() {
  }

  login(){
  	if(!this.username || !this.password){
  		this.message = "Fill out all required fields."
  	}
  	else{
  		let user = {'username': this.username, 'password': this.password}
  		let obs = this._httpservice.getLogin(user)
  		obs.subscribe(data => {
  			if(data['errors']){
  				this.message = data['errors']
  			}
  			else{
  				this._httpservice.setSession(data['session'])
  				if(data['session']['admin']){
  					this._router.navigate(['/dashboard/orders'])
  				}
  				else{
  					this._router.navigate(['/store'])
  				}
  			}
	  	})
  	}
  }
  register(){
  	if(!this.name || !this.newusername || !this.newpassword || !this.confirmpassword){
  		this.message = "Fill out all required fields."
  	}
  	else if(this.newpassword != this.confirmpassword){
  		this.message = "Passwords do not match"
  	}
  	else{
  		let user = {'name': this.name, 'username': this.newpassword, 'password': this.confirmpassword }
  		this.registerUser(user)
  	}
  }
  registerUser(user){
  	let obs = this._httpservice.regUser(user)
	  	obs.subscribe(data => {
	  		console.log(data)
	  		if(data['errors']){
	  			this.message = data['errors']['username']['message']
	  		}
	  		else{
	  			this.message = "Success! Redirecting to store."
	  			setTimeout(() => {
		            this._router.navigate(['/store'])
		          }, 2000)
	  		}
	  	})
  }
}
