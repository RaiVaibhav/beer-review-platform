import { Injectable } from '@angular/core';
// import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';

import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private store: Store<fromRoot.AppState>,
              private router: Router) {}


}
