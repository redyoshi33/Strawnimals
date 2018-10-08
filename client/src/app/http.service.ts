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
}
