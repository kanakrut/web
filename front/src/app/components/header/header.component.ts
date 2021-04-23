import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logged = this.userService.logged;
  user = this.userService.user;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.changed.subscribe(val => {
      this.logged = val;
      this.user = this.userService.user;
    });
  }

  logOut() {
    this.userService.user = new User();
    this.userService.toggle(false);
  }
}
