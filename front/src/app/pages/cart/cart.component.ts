import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UserService} from '../../services/user.service';
import {ErrorService} from '../../services/error.service';
import {Router} from '@angular/router';
import {Products} from '../../models/Products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Products[] = []
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
    console.log(product.carts, this.userService.user.cart.id);
    product.carts = product.carts.filter(cartId => cartId !== this.userService.user.cart.id);
    console.log(product.carts);
    this.apiService.updateProduct(product).subscribe(res => {
      this.refresh();
      this.loading = false;
      alert('Deleted!');
    });
  }

  refresh() {
    this.apiService.getUserInfo().subscribe(user => {
      this.userService.user = user;
      this.products = this.userService.user.cart.products;
    });
  }
}
