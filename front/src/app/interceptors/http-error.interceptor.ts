import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ErrorService} from '../services/error.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Что-то пошло не так, пожалуйста, повторите попытку!';
          if (error.error instanceof ErrorEvent) {
            // client-side error
          } else {
            // server-side error
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.userService.toggle(false);
              return next.handle(request);
            }

            try {
              errorMessage = Object.values(error.error).toString();
            } catch (e) {

            }

            try {
              errorMessage = Object.values(error.error.error)[0].toString();
            } catch (e) {

            }

          }
          if (errorMessage.length > 100) {
            this.router.navigate(['/']);
            return throwError(errorMessage);
          }

          if (errorMessage === 'true') {
            errorMessage = 'Нет соединения, повторите попытку!';
          }

          this.errorService.setError(errorMessage);
          // return an observable with a user-facing error message
          return throwError(errorMessage);
        })
      );
  }
}
