import { Injectable } from '@angular/core';
import { NewUser } from './models/newUser.model';
import { LoginCredentials } from './models/loginCredentials.model';
import { Token } from './models/token.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';
import * as UIActions from'../shared/store/ui/ui.actions';
import * as fromApp from '../store/app.reducer'

@Injectable()
export class AuthHttpService{
  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>){}

  private rootdomain                  =    'http://localhost:8000/';

  private djangoRegister              =    this.rootdomain + 'rest-auth/registration/';
  private djangoVerify                =    this.rootdomain + 'rest-auth/registration/verify-email/';
  private djangoLogin                 =    this.rootdomain + 'rest-auth/login/';
  private djangoLogout                =    this.rootdomain + 'rest-auth/logout/';
  private djangoVerifyToken           =    this.rootdomain + 'jwt/token-verify/';
  private djangoResetPasswordRequest  =    this.rootdomain + 'rest-auth/password/reset/';
  private djangoResetPasswordConfirm  =    this.rootdomain + 'rest-auth/password/reset/confirm/';
  private djangoChangePassword        =    this.rootdomain + 'rest-auth/password/change/';
  private djangoGetBears              =    this.rootdomain + 'api/bears/';
  private djangoGetCreateReview       =    this.rootdomain + 'api/reviews/';

  register(user: NewUser){
    this.store.dispatch(new UIActions.StartLoading())
    return this.http.post<Token>(this.djangoRegister, user)
    .pipe(
      result => {
        return result;
      }
    )
  }
  verify(key:any){
    return this.http.post(this.djangoVerify, key)
  }
  login(credentials: LoginCredentials){
    this.store.dispatch(new UIActions.StartLoading())
    return this.http.post<Token>(this.djangoLogin, credentials)
    .pipe(result => {
          this.store.dispatch(new AuthActions.Signin())
          return result;
        }
    )

  }
  logout(){
    return this.http.post(this.djangoLogout, {})
    .pipe(
      result => {
        this.store.dispatch(new AuthActions.Logout())
        return result;
      }
    )
  }
  
  verify_token(token:any){
    return this.http.post(this.djangoVerifyToken, token)
  }

  reset_password(email){
    this.store.dispatch(new UIActions.StartLoading())
    return this.http.post(this.djangoResetPasswordRequest, email)
  }
  reset_password_confirm(resetConfirm){
    this.store.dispatch(new UIActions.StartLoading())
    return this.http.post(this.djangoResetPasswordConfirm, resetConfirm)
  }
  changePassword(passwordArray){
    this.store.dispatch(new UIActions.StartLoading())
    return this.http.post(this.djangoChangePassword, passwordArray)
  }
  getBears(){
    return this.http.get(this.djangoGetBears)
  }
  createReview(data){
    return this.http.post(this.djangoGetCreateReview, data)
  }
  getReviews(){
    return this.http.get(this.djangoGetCreateReview);
  }
}
