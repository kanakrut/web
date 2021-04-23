import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public error = '';

  @Output() change: EventEmitter<string> = new EventEmitter();

  setError(val) {
    this.error = val;
    this.change.emit(this.error);
    setTimeout(() =>
      {
        this.error = '';
        this.change.emit(this.error);
      },
      10000);
  }
}
