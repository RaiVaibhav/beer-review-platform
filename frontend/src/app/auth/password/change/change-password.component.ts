import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthHttpService } from '../../auth-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducer';
import * as UIActions from '../../../shared/store/ui/ui.actions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordChangeForm: FormGroup;
  token: string;
  uid: string;
  djangoEmail = false;
  passwords: any;
  constructor(private httpService: AuthHttpService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
      this.passwordChangeForm = new FormGroup({
        'new_password1': new FormControl('', Validators.required),
        'new_password2': new FormControl('', Validators.required),
        'old_password': new FormControl('', Validators.required),
      });
  }

  onSubmit() {
    const passwordChangeForm = this.passwordChangeForm;
    this.passwords = {
      new_password1: passwordChangeForm.value.new_password1,
      new_password2: passwordChangeForm.value.new_password2,
      old_password: passwordChangeForm.value.old_password
    };

    if (passwordChangeForm.valid) {
      this.httpService.changePassword(this.passwords)
      .subscribe(
        (response) => {
          this.store.dispatch(new UIActions.StopLoading());
          this.store.dispatch(new UIActions.SnackBar(`Password change sucessfully`));
          this.router.navigate(['/']);

        },
        (error) => {
          this.store.dispatch(new UIActions.StopLoading());
          this.store.dispatch(new UIActions.SnackBar(`Error: ${error.error.new_password2[0]}`));
        },
      );
    } else {
      this.store.dispatch(new UIActions.SnackBar(`Please enter the valid values`));
    }
  }

}

