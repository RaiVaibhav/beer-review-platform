import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthHttpService } from '../../auth-http.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducer';
import * as UIActions from '../../../shared/store/ui/ui.actions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup
  constructor(private httpService: AuthHttpService,
              private router: Router,
              private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
    })
  }


  onSubmit(){
    let resetForm = this.resetForm;
    let email = {
      email: resetForm.value.email
    }
    if (resetForm.valid){
      this.httpService.reset_password(email)
      .subscribe((response)=>{
        this.router.navigate(['/']);
        this.store.dispatch(new UIActions.StopLoading())
      },
      (error)=>{
        this.store.dispatch(new UIActions.StopLoading())
        this.store.dispatch(new UIActions.SnackBar(`Error: ${error.error.email? error.error.email: error.message}`))
      })
    }
  }

}


