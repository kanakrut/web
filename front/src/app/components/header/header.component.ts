import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserService
  ) {}

  ngOnInit(): void {
  }

  logOut() {
    this.userService.user = new User();
    this.userService.toggle(false);
    localStorage.removeItem('token');
  }
}
