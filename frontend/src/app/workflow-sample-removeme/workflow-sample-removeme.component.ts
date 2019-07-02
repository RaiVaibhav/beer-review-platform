import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { AuthHttpService } from '../auth/auth-http.service';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-workflow-sample-removeme',
  templateUrl: './workflow-sample-removeme.component.html',
  styleUrls: ['./workflow-sample-removeme.component.css']
})
export class WorkflowSampleRemovemeComponent implements OnInit {
  token: String;
  authState: Observable<fromAuth.AuthState>

  constructor(private store: Store<fromRoot.AppState>,
              private httpService: AuthHttpService,
              private cookie: CookieService,) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

}//landingcomponent
