import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from '../shared/store/ui/ui.reducer';
import * as fromUser from '../user/store/user.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  ui: fromUi.State,
  user: fromUser.UserState,
  auth: fromAuth.AuthState,
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  user: fromUser.userReducer,
  auth: fromAuth.authReducer
};
