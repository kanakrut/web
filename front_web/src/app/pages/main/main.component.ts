import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Cart} from '../../models/Cart';
import {Product} from '../../models/Product';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  products: Product[] = [];

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


}

