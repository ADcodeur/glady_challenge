import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY } from '../shared/constante';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', API_KEY),
    });
    return next.handle(authReq);
  }
}
