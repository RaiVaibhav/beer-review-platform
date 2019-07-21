
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as UIActions from './ui.actions';
import * as fromRoot from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIEffects {

    constructor(private actions$: Actions,
            private store: Store<fromRoot.AppState>,
            private snackBar: MatSnackBar, ) {}

    @Effect()
    snackBarProc = this.actions$
        .ofType(UIActions.SNACK_BAR)
        .pipe(map((action: UIActions.SnackBar) => {
                this.openSnackBar(action.payload, 'OK');
                return action.payload;
            }))
        .pipe(map(message => ({ type: 'SNACK_BAR', payload: message })));


    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
        }
}
