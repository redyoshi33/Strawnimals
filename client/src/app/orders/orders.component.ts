import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

var moment = require('moment')

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	constructor(
	 	private _route: ActivatedRoute,
	    private _router: Router,
	    private _httpservice: HttpService,
	) { }

	orders: any;
	searched: any;
	filtered: any;
	displayed: any;
	searchid: any;
	filterstatus: any;
	search: any;
	pages: any;


    ngOnInit() {
  		this.fetchOrders()
  		this.searchid = "default"
  		this.filterstatus = "showall"
    }
    fetchOrders(){
	  	let obs = this._httpservice.getOrders()
	  	obs.subscribe(data => {
	  		this.orders = data
	  		this.searched = data
	  		this.filtered = data
	  		this.displayed = this.createTable(data, 0)
	  		this.pages = this.createPages(data)
	  	})
    }
    submitSearch(){
    	let temp = []
		if(this.searchid === 'id'){
			temp = this.orders.filter( order => order.id === parseInt(this.search))
			this.searched = temp 
			this.filtered = temp
			this.pages = this.createPages(temp)
		}
		if(this.searchid === 'name'){
			temp = this.orders.filter( order => order.name == this.search)
			this.searched = temp 
			this.filtered = temp
			this.pages = this.createPages(temp)
		}
		// if(this.state.searchid === 'date'){
		// 	this.setState({data: this.state.orders.filter( order => order.date === moment(this.state.search).format('MM/DD/YYYY'))})
		// }
		if(this.searchid === 'default'){
			temp = this.orders
			this.searched = temp 
			this.filtered = temp
			this.pages = this.createPages(temp)
			this.search = ""
		}
		temp = this.createTable(temp, 0)
		this.displayed = temp
		this.filterstatus = "showall"
		event.preventDefault()
    }
    filterStatus(){
		let temp = []
		if(this.filterstatus === 'showall'){
			temp = this.searched
			this.filtered = temp
			this.pages = this.createPages(temp)
		}
		if(this.filterstatus === 'inprocess'){
			temp = this.searched.filter( order => order.status === 'Order in process')
			this.filtered = temp
			this.pages = this.createPages(temp)
		}
		if(this.filterstatus === 'shipped'){
			temp = this.searched.filter( order => order.status === 'Shipped')
			this.filtered = temp
			this.pages = this.createPages(temp)
		}
		if(this.filterstatus === 'cancel'){
			temp = this.searched.filter( order => order.status === 'Cancelled')
			this.filtered = temp
			this.pages = this.createPages(temp)
		}
		temp = this.createTable(temp, 0)
		this.displayed = temp
	}
	resetforms(){
		this.searched = this.orders, 
		this.filtered = this.orders, 
		this.displayed = this.createTable(this.orders, 0), 
		this.pages = this.createPages(this.orders),
		this.search = "",
		this.filterstatus = "showall",
		this.searchid = "default"
	}
    createTable(data, index){
		let table = []
		for(let i = index*10; i<index*10+10 && i<data.length; i++){
			table.push(data[i])
		}
		return table
	}
	createPages(data){
		let num = Math.ceil(data.length/10)
		let pages = []
		for(let i = 0; i<num; i++){
			pages.push(i)
		}
		return pages
	}
	changePages(ind){
		this.displayed = this.createTable(this.filtered, ind)
	}
    formatDate(date){
    	return moment(date).format('MM/DD/YYYY')
    }
    findTotal(arr){
    	let total = 0
		for(let i =0; i<arr.length; i++){
			total += arr[i].price
		}
		return total.toFixed(2)
    }
    updateStatus(id, event: any){
    	let status = {status: event.target.value}
    	let obs = this._httpservice.updateOrder(id, status)
	  	obs.subscribe(data => {
	  		this.orders.find((order, ind) => {
	  			if(order._id === data['order']['_id']){
	  				console.log("ORDERED")
	  				this.orders[ind] = data['order']
	  			}
	  		})
	  		this.searched.find((order, ind) => {
	  			if(order._id === data['order']['_id']){
	  				console.log("SEARCHED")
	  				this.searched[ind] = data['order']
	  			}
	  		})
	  		this.filtered.find((order, ind) => {
	  			if(order._id === data['order']['_id']){
	  				console.log("FILTERED")
	  				this.filtered[ind] = data['order']
	  			}
	  		})
	  	})
    }
}
