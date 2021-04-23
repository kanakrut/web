import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Cart} from '../../models/Cart';
import {Products} from '../../models/Products';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  products: Products[] = [];
  loading = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(id: number) {
    this.loading = true;
    if (this.userService.logged) {
      this.apiService.getCart(this.userService.user.id).subscribe(res => {
        const cart: Cart = res;
        this.apiService.getProduct(id).subscribe(product => {
          cart.products.push(product);
          this.apiService.updateCart(cart).subscribe(added => {
            this.loading = false;
            alert(product.title + ' was added to your cart!');
          });
        });
      });
    } else {
      this.loading = false;
      this.router.navigate(['/login']);
    }
  }
}

