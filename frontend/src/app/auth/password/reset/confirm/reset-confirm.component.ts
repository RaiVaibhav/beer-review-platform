import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthHttpService } from '../../../auth-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../store/app.reducer';
import * as UIActions from '../../../../shared/store/ui/ui.actions';

@Component({
  selector: 'app-reset-confirm',
  templateUrl: './reset-confirm.component.html',
  styleUrls: ['./reset-confirm.component.css']
})
export class ResetConfirmComponent implements OnInit {
  resetConfirmForm: FormGroup
  token: string
  uid: string
  djangoEmail: boolean = false;
  passwords: any;
  constructor(private httpService: AuthHttpService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    if (this.route.snapshot.params['uid'] && this.route.snapshot.params['token']){
      this.djangoEmail=true;
      this.uid = this.route.snapshot.params['uid'];
      this.token = this.route.snapshot.params['token'];
      this.resetConfirmForm = new FormGroup({
        'new_password1': new FormControl('', Validators.required),
        'new_password2': new FormControl('', Validators.required),
      })
    }else{
      this.resetConfirmForm = new FormGroup({
        'new_password1': new FormControl('', Validators.required),
        'new_password2': new FormControl('', Validators.required),
        'uid': new FormControl('', Validators.required),
        'token': new FormControl('', Validators.required),
      })
    }    
  }

  onSubmit(){
    let resetConfirm = this.resetConfirmForm;
    if (this.route.snapshot.params['uid'] && this.route.snapshot.params['token']){
      this.passwords = {
        uid: this.uid,
        token: this.token,
        new_password1: resetConfirm.value.new_password1,
        new_password2: resetConfirm.value.new_password2,
      }
    }else{
      this.passwords = {
        uid: resetConfirm.value.uid,
        token: resetConfirm.value.token,
        new_password1: resetConfirm.value.new_password1,
        new_password2: resetConfirm.value.new_password2,
      }
    }
    if (resetConfirm.valid){
      this.httpService.reset_password_confirm(this.passwords)
      .subscribe(
        (response)=>{
          this.store.select('auth')
          .subscribe((response)=>{
            if (response.user){
              this.router.navigate(['/']);
            }else{
              this.router.navigate(['/login']);
            }
          });
          this.store.dispatch(new UIActions.StopLoading());
        },
        (error)=>{
          this.store.dispatch(new UIActions.StopLoading())
          this.store.dispatch(new UIActions.SnackBar(`Error: ${error.error.new_password2[0]}`))
        }
      )
    }


  }

}
