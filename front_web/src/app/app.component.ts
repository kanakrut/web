import {Component, OnInit} from '@angular/core';
import {ErrorService} from './services/error.service';
import {ApiService} from './services/api.service';
import {UserService} from './services/user.service';
import {User} from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aliexpress-front';
  error = '';

  constructor(
    private errorService: ErrorService,
    private apiService: ApiService,
    private userService: UserService,
  ) {
    errorService.change.subscribe(error => this.error = error);
  }

  ngOnInit(): void {
    this.userService.changed.subscribe(val => {
      if (val) {
        this.apiService.getUserInfo().subscribe(user => {
          console.log(user);
          this.userService.user = user;
        });
      } else {
        this.userService.user = new User();
      }
    });

    this.errorService.change.subscribe(val => {
      this.error = val;
    });

    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      this.userService.toggle(true);
    }
  }
}
