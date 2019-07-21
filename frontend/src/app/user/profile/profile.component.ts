import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducer';
import { Observable } from 'rxjs';
import * as fromRoot from '../../store/app.reducer';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authState: Observable<fromAuth.AuthState>;

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

}
