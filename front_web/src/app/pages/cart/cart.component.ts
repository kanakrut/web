import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UserService} from '../../services/user.service';
import {ErrorService} from '../../services/error.service';
import {Router} from '@angular/router';
import {Product} from '../../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Product[] = []
  loading = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.changed.subscribe(val => {
      if (!val) {
        this.router.navigate(['/']);
      }
    })
    if (!this.userService.logged) {
      this.router.navigate(['/']);
    } else {
      this.refresh();
    }
  }

  delete(product) {
    this.loading = true;
    this.userService.user.cart.products = this.userService.user.cart.products.filter(productId => productId !== product.id);
    this.apiService.updateCart(this.userService.user.cart).subscribe(res => {
      this.refresh();
      this.loading = false;
      alert('Deleted!');
    });
  }

  refresh() {
    this.products = []
    this.apiService.getUserInfo().subscribe(user => {
      this.userService.user = user;
      this.userService.user.cart.products.map(productId => {
        this.apiService.getProductDetails(productId).subscribe(product => this.products.push(product));
      })
    });
  }
}
