import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

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
	private modalService: NgbModal,
	private spinner: NgxSpinnerService,
	) { }

  	products: any;
	searched: any;
	displayed: any;
	search: any;
	pages: any;
	message: string;
	lastID: number;
	modalReference: any;
	session: any;
	admin: any;

  	ngOnInit() {
  		this.session = this._httpservice.checkSession()
  		this.admin = this.session['admin']
  		if(!this.admin){
  			this._router.navigate(['/store'])
  		}
  		this.spinner.show()
  		this.fetchProducts()
  	}

  	fetchProducts(){
	  	let obs = this._httpservice.getProducts()
	  	obs.subscribe(data => {
	  		this.products = data
	  		if(data['length']<1){
	  			this.lastID = 0
	  		}
	  		else{
	  			this.lastID = data[data['length']-1]['id']
	  		}
	  		this.setVariables()
	  		this.spinner.hide()
	  	})
    }
    setVariables(){
    	this.searched = this.products
	  	this.displayed = this.createTable(this.products, 0)
	  	this.pages = this.createPages(this.products)
    }
    submitSearch(){
    	if(!this.search){
    		this.setVariables()
    	}
    	else{
    		let rgx = new RegExp('^[a-zA-Z0-9_.-]*$')
            if(rgx.test(this.search)){
                let regex = new RegExp('.*'+this.search+'.*')
                let temp = this.products.filter( product => regex.test(product.name) || regex.test(product.name.toLowerCase()))
                this.searched = temp 
                this.pages = this.createPages(temp)
                temp = this.createTable(temp, 0)
                this.displayed = temp
            }
    	}
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
	newModal(){
		this.message = " "
		this.modalReference = this.modalService.open(ProductModalComponent)
	    this.modalReference.componentInstance.edit = false
	    this.modalReference.componentInstance.lastID = this.lastID
	    this.modalReference.result.then((result) => {
	    	if(result === 'Added'){
	    		this.fetchProducts()
	    		this.setVariables()
	    		this.message = "Added product"
	    	}
	    }).catch((error) => {
	    	console.log(error);
	  	});
	}
	editModal(product) {
		this.message = " "
	    this.modalReference = this.modalService.open(ProductModalComponent)
	    this.modalReference.componentInstance.data = product
	    this.modalReference.componentInstance.edit = true
	    this.modalReference.result.then((result) => {
	    	if(result === 'Update'){
	    		this.fetchProducts()
	    		this.setVariables()
	    		this.message = "Updated product"
	    	}
	    }).catch((error) => {
	    	console.log(error);
	  	});
  	}
  	delteModal(id, name){
  		this.message = " "
  		this.modalReference = this.modalService.open(DeleteModalComponent)
  		this.modalReference.componentInstance.id = id
  		this.modalReference.componentInstance.name = name
  		this.modalReference.result.then((result) => {
	    	if(result === 'Deleted'){
	    		this.fetchProducts()
	    		this.setVariables()
	    		this.message = "Deleted product"
	    	}
	    }).catch((error) => {
	    	console.log(error);
	  	});
  	}
}
