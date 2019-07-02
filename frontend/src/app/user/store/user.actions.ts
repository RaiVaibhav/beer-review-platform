import { Action } from '@ngrx/store';

export const STORE_TOKEN = '[User] Add Verify Token';

export class StoreToken implements Action {
  readonly type = STORE_TOKEN;
  constructor(public payload: String){
  }
}


export type UserActions = StoreToken;
