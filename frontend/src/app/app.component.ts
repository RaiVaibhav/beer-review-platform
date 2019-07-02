import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './store/app.reducer'
import * as fromUi from './shared/store/ui/ui.reducer';
import { ViewEncapsulation } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as AuthActions from './auth/store/auth.actions';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(private store: Store<fromRoot.AppState>,
    protected router: Router){
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelperService();
      if (!jwt.isTokenExpired(token)){
        let currentUser = jwt.decodeToken(token);
        this.store.dispatch(new AuthActions.SetToken(token))
        this.store.dispatch(new AuthActions.SetUser(currentUser))      
      }else{
        this.store.dispatch(new AuthActions.SetToken(null))
        this.store.dispatch(new AuthActions.SetUser(null)) 
        this.router.navigate(['/login']);
      }
    }
  }
  title = 'Beer app';
  isLoading: Observable<fromUi.State>

  ngOnInit(){
    this.isLoading = this.store.select('ui')
  }


}
