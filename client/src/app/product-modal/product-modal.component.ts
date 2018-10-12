import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @Input() data: any; edit: boolean; lastID: number;

  constructor(
  	public activeModal: NgbActiveModal,
  	private _httpservice: HttpService,
  ) { }

  name: string;
  description: string;
  category: string;
  count: number;
  price: number;
  image: any;
  displayedImages: any;
  mainImage: any;
  error: string;

  ngOnInit() {
  	if(this.data){

  		this.name = this.data.name
  		this.description = this.data.description
  		this.category = this.data.category
  		this.count = this.data.count
  		this.price = this.data.price
      this.displayedImages = [...this.data.images]
      this.mainImage = this.data.mainImage
  	}
  	else{
  		this.name = ""
  		this.description = ""
  		this.category = ""
      this.displayedImages = []
      this.mainImage = ""
  	}
  }
  closeModal(msg) {
  	this.activeModal.close(msg);
  }
  onFileChanged(event){
    this.image = event.target.files[0]
    this.error = ""
  }
  imageUpload(){
    let filetypes = /image/
    let filecheck = filetypes.test(this.image.type)
    if(!filecheck){
      this.error = "Images only"
    }
    else{
      const fd = new FormData()
      fd.append('myImage', this.image, this.image.name)
      let obs = this._httpservice.imageUpload(fd)
      obs.subscribe(data => {
        if(data.err){
          this.error = data.err.message
        }
        else{
          console.log(data)
          let imagetype = data.img.contentType
          let base64 = Buffer.from(data.img.data).toString('base64')
          let path = "data:"+imagetype+";base64,"+base64
          this.displayedImages.push({path: path, name: data.name, id: data._id})
          if(!this.mainImage){
            this.mainImage = path
          }
        }
      })
    }
  }
  setMain(path){
    this.mainImage = path
  }
  deleteImage(image){
    let index = this.displayedImages.indexOf(image)
    this.displayedImages.splice(index, 1)
    if(image.path === this.mainImage){
      if(this.displayedImages.length > 0){
        this.mainImage = this.displayedImages[0].path
      }
      else{
        this.mainImage = ""
      }
    }
  }
  addProduct(){
    if(this.productCheck()){
      if(!this.mainImage){
        this.mainImage = this.displayedImages[0].path
      }
      let obs = this._httpservice.addProduct({id: ++this.lastID, name: this.name, description: this.description, category: this.category, count: this.count, price: this.price, images: this.displayedImages, mainImage: this.mainImage})
      obs.subscribe(data => {
        if(data.err){
          console.log("Failed")
        }
        else{
          this.closeModal('Added')        
        }
      })
    }
  }
  productCheck(){
    if(this.name && this.price && this.count && this.category && this.description && this.displayedImages.length>0){
      return true
    }
    else if(!this.name || !this.price || !this.count || !this.category || !this.description){
      this.error = "Please fill in all fields"
      return false
    }
    else if(this.displayedImages.length===0){
      this.error = "Please upload an image"
      return false
    }
  }
  updateProduct(id){
    if(this.productCheck()){
      let obs = this._httpservice.updateProduct(id, {name: this.name, description: this.description, category: this.category, count: this.count, price: this.price, images: this.displayedImages, mainImage: this.mainImage})
        obs.subscribe(data => {
        this.closeModal('Update')
      })
    }
  }
}
