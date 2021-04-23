import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../models/Cart';
import {Products} from '../models/Products';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private productsUrl = 'api/products';
  private cartsUrl = 'api/carts';
  private userUrl = 'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  /** GET heroes from the server */
  getProduct(id): Observable<Products> {
    return this.http.get<Products>(this.productsUrl + '/' + id);
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.productsUrl);
  }

  getCards() {
    return this.http.get(this.cartsUrl);
  }

  getCart(id: number): Observable<Cart> {
    return this.http.get<Cart>(this.cartsUrl + '/' + id);
  }

  craateCart(cart) {
    return this.http.post(this.cartsUrl, cart, this.httpOptions);
  }

  updateCart(cart: Cart): Observable<any> {
    return this.http.put(this.cartsUrl + '/' + cart.id, cart, this.httpOptions);
  }

  login(username, password) {
    return this.http.get<User>(this.userUrl + '?username=' + username + '&password=' + password);
  }

  register(user) {
    return this.http.post(this.userUrl, user, this.httpOptions);
  }

  getUsers() {
    return this.http.get(this.userUrl);
  }
}
