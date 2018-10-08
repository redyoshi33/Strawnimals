import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
  	private _route: ActivatedRoute,
	private _router: Router,
	private _httpservice: HttpService,
	private modalService: NgbModal
	) { }

  	products: any;
	searched: any;
	displayed: any;
	search: any;
	pages: any;
	modalReference: any;

  	ngOnInit() {
  		this.fetchProducts()
  	}

  	fetchProducts(){
	  	let obs = this._httpservice.getProducts()
	  	obs.subscribe(data => {
	  		this.products = data
	  		this.searched = data
	  		this.displayed = this.createTable(data, 0)
	  		this.pages = this.createPages(data)
	  	})
    }
    submitSearch(){
    	let temp = []
		temp = this.products.filter( product => product.name == this.search)
		this.searched = temp 
		this.pages = this.createPages(temp)
		temp = this.createTable(temp, 0)
		this.displayed = temp
		event.preventDefault()
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
		this.displayed = this.createTable(this.searched, ind)
	}

	editModal(product) {
	    this.modalReference = this.modalService.open(ProductModalComponent)
	    this.modalReference.componentInstance.data = product

	    this.modalReference.result.then((result) => {
	    	console.log(result);
	    }).catch((error) => {
	    	console.log(error);
	  	});
  	}
}
