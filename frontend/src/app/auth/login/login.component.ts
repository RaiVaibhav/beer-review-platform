import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginCredentials } from '../models/loginCredentials.model';
import { AuthHttpService } from '../auth-http.service';
import { CookieService } from 'angular2-cookie/core';
// import * as UserActions from '../store/user.actions';
import { Token } from '../models/token.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UIActions from '../../shared/store/ui/ui.actions';
import * as AuthActions from '../store/auth.actions';
import * as fromRoot from '../../store/app.reducer'
import { JwtHelperService } from '@auth0/angular-jwt'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  creds: LoginCredentials
  token: Token

  constructor(private store: Store<fromRoot.AppState>,
              private httpService: AuthHttpService,
              private router: Router,
              private cookie: CookieService,) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    })
  }

  onSubmit(){
    let loginForm = this.loginForm;
    this.creds = new LoginCredentials(
      loginForm.value.username,
      loginForm.value.password,
    )
    
    if (loginForm.valid){
      this.httpService.login(this.creds)
        .subscribe(
          (response)=>{
            localStorage.setItem('token', response.token);
            let jwt = new JwtHelperService();
            let currentUser = jwt.decodeToken(localStorage.getItem('token'));
            this.store.dispatch(new AuthActions.SetToken(response.token))
            this.store.dispatch(new AuthActions.SetUser(currentUser))
            this.router.navigate(['/review-list']);
            this.store.dispatch(new UIActions.StopLoading())
          },
          (err)=>{
            this.store.dispatch(new UIActions.StopLoading())
            this.store.dispatch(new UIActions.SnackBar(`Error: ${err.error.non_field_errors[0]}`))
          },
        )
    }else{
      this.store.dispatch(new UIActions.SnackBar(`Please enter the valid values`))
    }
  }
  navOut(){

    this.router.navigate(['']);
  }
}
