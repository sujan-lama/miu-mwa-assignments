import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = localStorage.getItem('user');

    if (user != null) {
      const userData = JSON.parse(user);
      const copy = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${userData.token}`
        ),
      });
      return next.handle(copy);
    }
    return next.handle(request);
  }
}
