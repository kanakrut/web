import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../models/Cart';
import {User} from '../models/User';
import {Products} from '../models/Products';

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

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseUrl + '/products/');
  }

  updateProduct(product): Observable<any> {
    return this.http.put(this.baseUrl + '/product/' + product.id + '/', JSON.stringify(product), this.httpOptions);
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
}
