import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { Observable } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return this.store.select('auth').pipe(
      first(),
      flatMap(authState => {
        const authReq = !!authState.token ? req.clone({
          setHeaders: { Authorization: 'JWT ' + authState.token },
        }) : req;
        return next.handle(authReq);
      }),
    );

  }
}