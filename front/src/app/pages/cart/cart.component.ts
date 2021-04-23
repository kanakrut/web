import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UserService} from '../../services/user.service';
import {ErrorService} from '../../services/error.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cart} from '../../models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart = new Cart();
  loading = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (!this.userService.logged) {
      this.router.navigate(['/']);
    } else {
      this.apiService.getCart(this.userService.user.id).subscribe(cart => {
        this.cart = cart;
      });
    }
  }

  delete(id) {
    this.loading = true;
    this.cart.products = this.cart.products.filter(value => value.id !== id);
    this.apiService.updateCart(this.cart).subscribe(res => {
      this.loading = false;
      alert('Deleted!');
    });
  }
}
