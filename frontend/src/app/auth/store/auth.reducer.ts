import { Action } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import * as AuthActions from './auth.actions';

export interface AuthState {
    token: String;
    authenticated: boolean;
    user: any;
}
const initialState: AuthState = {
    token: null,
    authenticated: false,
    user: null

};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case (AuthActions.SIGNUP):
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authenticated: true,
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false,
            };
        case (AuthActions.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            };
        case (AuthActions.SET_USER):
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
export const getAuthState = (state: AuthState) => state;
