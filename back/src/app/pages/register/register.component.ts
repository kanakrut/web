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
    public errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  register() {
    if (this.user.password === this.password2) {
      this.apiService.register(this.user).subscribe(res => {
        this.apiService.createCard(res['id']).subscribe(res2 => {
          this.router.navigate(['/login']);
        });
      });
    } else {
      this.errorService.setError('Passwords are not equal!');
    }
  }
}
