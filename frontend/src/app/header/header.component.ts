import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { Observable } from 'rxjs';
import { AuthHttpService } from '../auth/auth-http.service';
import { Router } from '@angular/router';
import * as AuthActions from '../auth/store/auth.actions';
import { AuthGuard } from '../auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.AuthState>;

  constructor(private cookie: CookieService,
              private store: Store<fromApp.AppState>,
              private httpService: AuthHttpService,
              private router: Router) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  logout() {
    this.httpService.logout()
      .subscribe(response => {
        if (response['detail']) {
          localStorage.removeItem('token');
          this.store.dispatch(new AuthActions.SetUser(null));
          this.store.dispatch(new AuthActions.SetToken(null));
        }
      });
    this.router.navigate(['/']);
  }

}
