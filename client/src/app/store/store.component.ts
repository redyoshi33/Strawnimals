import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(
  	private _route: ActivatedRoute,
	private _router: Router,
	private _httpservice: HttpService,
  ) { }

    products: any;
    category: any;
	searched: any;
	displayed: any;
	search: string;
	pages: any;
	categoryType: string;
	currentPage: number;
	filterid: string;

    ngOnInit() {
  		this.fetchProducts()
    }
    fetchProducts(){
	  	let obs = this._httpservice.getProducts()
	  	obs.subscribe(data => {
	  		this.products = data
	  		this.setVariables()
	  		console.log(this.products)
	  	})
    }
    setVariables(){
    	console.log(this.products)
    	this.search = ""
    	this.filterid = "default"
    	this.searched = [...this.products]
    	this.category = [...this.products]
	  	this.displayed = this.createTable(this.products, 0)
	  	this.pages = this.createPages(this.products)
	  	this.currentPage = 1
	  	this.categoryType = "All Products"
	  	
    }
    changeCategory(value){
    	this.search = ""
    	this.filterid = "default"
    	let temp = this.products.filter( product => product.category === value)
    	this.category = temp
		this.searched = temp
		this.pages = this.createPages(temp)
		temp = this.createTable(temp, 0)
		this.displayed = temp
    }
    submitSearch(){
    	if(!this.search){
    		this.setVariables()
    		this.filterid = "default"
    	}
    	else{
			let temp = this.category.filter( product => product.name.startsWith(this.search))
			this.searched = temp 
			this.pages = this.createPages(temp)
			temp = this.createTable(temp, 0)
			this.displayed = temp
    	}
		event.preventDefault()
    }
    filterBy(){
    	console.log(this.filterid)
    	if(this.filterid === "default"){
    		this.searched.sort((a,b) => 
    			a.id < b.id ? -1 : 1;
    		)
    	}
    	else if(this.filterid === "popular"){
    		this.searched.sort((a,b) => 
    			a.sold < b.sold ? -1 : 1;
    		)
    	}
    	else if(this.filterid === "name"){
    		this.searched.sort((a,b) => 
    			a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    		)
    	}
    	else if(this.filterid === "price low"){
    		this.searched.sort((a,b) => 
    			a.price < b.price ? -1 : 1;
    		)
    	}
    	else if(this.filterid === "price high"){
    		this.searched.sort((a,b) => 
    			a.price > b.price ? -1 : 1;
    		)
    	}
    	this.displayed = this.createTable(this.searched, 0)
    	this.currentPage = 1

    }
    createTable(data, index){
		let table = []
		for(let i = index*12; i<index*12+12 && i<data.length; i++){
			table.push(data[i])
		}
		return table
	}
	createPages(data){
		let num = Math.ceil(data.length/12)
		let pages = []
		for(let i = 0; i<num; i++){
			pages.push(i)
		}
		return pages
	}
	changePages(ind){
		if(ind>=0 && ind<this.pages.length){
			this.displayed = this.createTable(this.searched, ind)
			this.currentPage = ind+1
		}
	}
}
