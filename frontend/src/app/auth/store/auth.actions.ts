import { Action } from '@ngrx/store';


export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';

export class Signup implements Action {
    readonly type = SIGNUP;
}
export class Signin implements Action {
    readonly type = SIGNIN;
}
export class Logout implements Action {
    readonly type = LOGOUT;
}
export class SetUser implements Action {
    readonly type = SET_USER;
    constructor(public payload: any) {}
}
export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}


export type AuthActions = Signup | Signin | Logout | SetToken | SetUser;
