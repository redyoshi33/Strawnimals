import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class HttpService {

  private cartSource = new BehaviorSubject<any[]>([])
  cart = this.cartSource.asObservable()
  private sessionSource = new BehaviorSubject<any[]>([])
  session = this.sessionSource.asObservable()

  constructor(private _http: HttpClient) { 
    
  }
  getLogin(user){
    return this._http.post('/checkLogin', user)
  }
  logoutSession(){
    return this._http.get('/logout')
  }
  regUser(user){
    return this._http.post('/registerUser', user)
  }
  setSession(session){
    this.sessionSource.next(session)
  }
  checkSession(){
    return this.sessionSource.getValue()
  }
  clearSession(){
    this.sessionSource.next([])
  }
  getOrders(){
  	return this._http.get('/getAllOrders')
  }
  getOrder(id){
  	return this._http.get('/findOrder/'+id)
  }
  updateOrder(id, status){
  	return this._http.put('/updateOrder/'+id, status)
  }
  submitOrder(order){
    return this._http.post('/newOrder', order)
  }
  getProducts(){
  	return this._http.get('/getAllProduct')
  }
  getProduct(id){
    return this._http.get('/getProduct/'+id)
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
  getSimilar(category){
    return this._http.get('/findSimilar/'+category)
  }
  imageUpload(image){
    return this._http.post('/image', image)
  }
  addCart(data){
    let array = this.cartSource.getValue()
    array.push(data)
    this.cartSource.next(array)
    return "Added to Cart"
  }
  updateCart(data, index){
    let array = this.cartSource.getValue()
    array[index] = data
    this.cartSource.next(array)
    return "Updated Cart"
  }
  clearCart(){
    this.cartSource.next([])
  }
}
