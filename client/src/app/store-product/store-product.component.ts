import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PicturemodalComponent } from '../picturemodal/picturemodal.component';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.css']
})
export class StoreProductComponent implements OnInit {

  constructor(
  	private _route: ActivatedRoute,
	  private _router: Router,
	  private _httpservice: HttpService,
    private modalService: NgbModal,
  	) { }

  id: any;
  itemid: number;
  product: any;
  category: string;
  inventory: number;
  description: string;
  images: any;
  mainImage: any;
  name: string;
  price: number;
  amount: number;
  similar: any;
  loaded: boolean;
  order: any;
  cart: any;
  message: string;
  msgclass: string;
  modalReference: any;

  ngOnInit() {
    this.loaded = false
  	this._route.params.subscribe((params: Params) => this.fetchProduct(params['id']))
  	this.amount = 1
    this.message = ""
    this.msgclass = "step"
    this._httpservice.cart.subscribe( data => {
      this.cart = data
    })
  }
  fetchProduct(id){
    this.id = id
  	let obs = this._httpservice.getProduct(id)
	  	obs.subscribe(data => {
        this.setVariables(data)
        this.itemid = data['id']
        this.loaded = true
	  		this.fetchSimilar(this.category)
	  })
  }
  fetchSimilar(category){
  	let obs = this._httpservice.getSimilar(category)
	  	obs.subscribe(data => {
        console.log(data)
	  		this.similar = data
	  		let index = data.findIndex(product => product.name === this.product.name)
	  		this.similar.splice(index, 1)
	  		this.similar = this.similar.slice(0,5)
        console.log(this.similar)
	  })
  }
  switchImage(image){
  	this.mainImage = image
  }
  pictureModal(){
    this.message = " "
    this.modalReference = this.modalService.open(PicturemodalComponent, { windowClass : "myCustomModalClass"})
    this.modalReference.componentInstance.image = this.mainImage
    this.modalReference.result.then((result) => {
        if(result === 'Closed'){
          console.log('Closed')
        }
      }).catch((error) => {
        console.log(error);
      });
  }
  switchProduct(product){
    this.setVariables(product)
    this.amount = 1
    window.scroll(0,0);
  }
  setVariables(data){
    this.mainImage = data['mainImage']
    this.product = data
    this.category = data['category']
    this.inventory = data['count']
    this.description = data['description']
    this.images = data['images']
    this.name = data['name']
    this.price = data['price']
  }
  addToCart(){
    let index = this.cart.findIndex(order => order.itemname === this.name)
    if(index > -1){
      let newAmount = this.cart[index]['quantity'] + this.amount
      if(this.inventory < newAmount){
        newAmount = this.inventory
      }
      let order = {'itemname': this.name, 'price': this.price, 'quantity': newAmount, 'maximum': this.inventory, itemid: this.itemid, id: this.id }
      this.message = this._httpservice.updateCart(order, index)
    }
    else {
      if(this.inventory < this.amount){
        this.amount = this.inventory
      }
      let order = {'itemname': this.name, 'price': this.price, 'quantity': this.amount, 'maximum': this.inventory, itemid: this.itemid, id: this.id }
        this.message = this._httpservice.addCart(order)
    }

    this.msgclass = "show"
    setTimeout(() => {
      this.msgclass = "step"
    }, 500)
  }
}
