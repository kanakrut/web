import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public user = new User();

  public logged = false;

  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  toggle(val: boolean) {
    this.logged = val;
    this.changed.emit(this.logged);
  }
}
