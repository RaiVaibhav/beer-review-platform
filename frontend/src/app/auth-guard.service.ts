import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
import * as fromRoot from './store/app.reducer'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(protected router: Router,
    private store: Store<fromRoot.AppState>,
    private route: ActivatedRoute) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelperService();
      if (jwt.isTokenExpired(token)){
        let currentUser = jwt.decodeToken(token);
        this.store.dispatch(new AuthActions.SetToken(token))
        this.store.dispatch(new AuthActions.SetUser(currentUser))      
      }
    }
  }

  canActivate() {
    let jwt = new JwtHelperService();
    if (jwt.isTokenExpired(localStorage.getItem('token'))){
      this.store.dispatch(new AuthActions.SetToken(null))
      this.store.dispatch(new AuthActions.SetUser(null)) 
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

