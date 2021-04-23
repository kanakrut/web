import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {ApiService} from '../../services/api.service';
import {UserService} from '../../services/user.service';
import {ErrorService} from '../../services/error.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cart} from '../../models/Cart';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();
  public password2 = '';

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  register() {
    if (this.user.password === this.password2) {
      this.apiService.getUsers().subscribe(users => {
        this.user.id = Object.keys(users).length + 1;
        this.apiService.register(this.user).subscribe(res => {
          this.createCart();
        }, error => this.errorService.setError(error));
      });
    } else {
      this.errorService.setError('Passwords are not equal!');
    }
  }

  createCart() {
      const cart = new Cart();
      cart.id = this.user.id;
      cart.user = this.user.id;
      this.apiService.craateCart(cart).subscribe(res => this.router.navigate(['/login']));
  }
}
