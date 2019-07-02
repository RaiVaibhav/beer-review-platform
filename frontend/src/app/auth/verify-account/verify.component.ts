import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthHttpService } from '../auth-http.service';
import { ActivatedRoute } from '@angular/router';
import * as UIActions from '../../shared/store/ui/ui.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer'

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  keyForm: FormGroup
  key: {}

  constructor(private httpService: AuthHttpService,
              private route: ActivatedRoute,
              private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    if (this.route.snapshot.params['key']){
      this.key = {key:this.route.snapshot.params['key']};
      this.httpService.verify(this.key)
      .subscribe(response => {
        this.store.dispatch(new UIActions.SnackBar(`Sucessfully verified`))
      },
      (error)=>{
        this.store.dispatch(new UIActions.SnackBar(`Error in verifying the key`))
      })
    }

    this.keyForm = new FormGroup({
      'key': new FormControl('', Validators.required),
    })
  }

  onSubmit(){
    let keyForm = this.keyForm;
    if (keyForm.valid){
      this.httpService.verify(keyForm.value)
      .subscribe(response => {
        this.store.dispatch(new UIActions.SnackBar(`Sucessfully verified`))
      },
      (error)=>{
        this.store.dispatch(new UIActions.SnackBar(`Error in verifying the key`))
      })
    }
  }
}
