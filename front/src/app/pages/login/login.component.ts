import {Component, OnInit} from '@angular/core';
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
  ) {
  }

  ngOnInit(): void {
  }

  logIn() {
    this.apiService.login(this.user.username, this.user.password).subscribe(token => {
      console.log(token);
      localStorage.setItem('token', token.toString());
      this.userService.toggle(true);
      this.router.navigate(['/']);
    });
  }
}
