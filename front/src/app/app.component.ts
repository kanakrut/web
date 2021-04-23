import { Component } from '@angular/core';
import {ErrorService} from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aliexpress-front';
  error = '';

  constructor(
    private errorService: ErrorService
  ) {
    errorService.change.subscribe(error => this.error = error);
  }
}
