import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../models/Comment';
import {User} from '../models/User';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/products/');
  }

  getProductDetails(id): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + '/product/' + id);
  }

  updateCart(cart): Observable<any> {
    return this.http.put(this.baseUrl + '/cart/' + cart.id + '/', JSON.stringify(cart), this.httpOptions);
  }

  createCard(userId): Observable<any> {
    return this.http.post(this.baseUrl + '/carts/', {user: userId}, this.httpOptions);
  }

  register(user) {
    return this.http.post(this.baseUrl + '/users/', JSON.stringify(user), this.httpOptions);
  }

  login(username, password) {
    return this.http.post(this.baseUrl + '/logIn/', {username, password}, this.httpOptions);
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + '/userInfo/');
  }

  addComment(comment) {
    console.log(JSON.stringify(comment));
    return this.http.post(this.baseUrl + '/comments/', JSON.stringify(comment), this.httpOptions);
  }

  getComments() {
    return this.http.get<Comment[]>(this.baseUrl + '/comments/');
  }

  updateComment(comment) {
    return this.http.put(this.baseUrl + '/comment/' + comment.id + '/', JSON.stringify(comment), this.httpOptions);
  }

  deleteCart(comment) {
    return this.http.delete(this.baseUrl + '/comment/' + comment.id + '/', this.httpOptions);
  }
}
