import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getOrders(){
  	return this._http.get('/getAllOrders')
  }
  getOrder(id){
  	return this._http.get('/findOrder/'+id)
  }
  updateOrder(id, status){
  	return this._http.put('/updateOrder/'+id, status)
  }
  getProducts(){
  	return this._http.get('/getAllProduct')
  }
  addProduct(product){
    return this._http.post('/newProduct', product)
  }
  updateProduct(id, product){
    return this._http.put('/updateProduct/'+id, product)
  }
  deleteProduct(id){
    return this._http.delete('/deleteProduct/'+id)
  }
  imageUpload(image){
    return this._http.post('/image', image)
  }
}
