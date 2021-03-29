import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (THERE IS ACCESS tOKeN) {
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${this.accessToken}`
    //   }
    // });
    // }
    return next.handle(request);
  }
}
