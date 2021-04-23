import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {ErrorService} from '../../services/error.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  logIn() {
    this.apiService.login(this.user.username, this.user.password).subscribe(user => {
      if (Object.keys(user).length !== 0) {
        this.user = user[0];
        this.userService.user = this.user;
        this.userService.toggle(true);
        this.router.navigate(['/']);
      } else {
        this.errorService.setError('Wrong username or password');
      }
    });
  }
}
