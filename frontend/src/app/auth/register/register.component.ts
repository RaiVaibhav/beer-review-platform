import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewUser } from '../models/newUser.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer'
import * as UI from '../../shared/store/ui/ui.actions';
import { Router } from '@angular/router';
import { AuthHttpService } from '../auth-http.service';
import * as UIActions from '../../shared/store/ui/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup
  user_submit: NewUser
  user: NewUser
  mystore = this.store

  constructor(private store: Store<fromRoot.AppState>,
              private router: Router,
              private httpService: AuthHttpService,) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'username': new FormControl('', Validators.required),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl('', Validators.required),
    })
  }//ngOnInit()

  onSubmit(){
    let signupForm = this.signupForm;
    if (signupForm.valid){
      
      this.user_submit = new NewUser(
        signupForm.value.username,
        signupForm.value.password1,
        signupForm.value.password2,
        signupForm.value.email,
      )
      this.httpService.register(this.user_submit)
        .subscribe(
          (response)=>{
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new UIActions.SnackBar(`Verification email has been send`));
          },
          (err)=>{
            debugger;
            this.store.dispatch(new UI.StopLoading()),
            this.store.dispatch(new UIActions.SnackBar(`Error: ${err.error.email? err.error.email: err.error.username}`));
          });
    }else{
      this.store.dispatch(new UIActions.SnackBar(`Please enter the valid values`))
    }
  }
}
