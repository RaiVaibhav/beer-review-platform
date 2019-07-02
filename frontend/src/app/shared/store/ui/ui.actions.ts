import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';
export const CHANGE_HEADER = '[UI] Change Header';
export const EDITING_ITEM = '[UI] Editing either Contact, Org, or Program';
export const SNACK_BAR = '[UI] Adds error message to bottom of screen';


export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}
export class ChangeHeaderTitle implements Action {
  readonly type = CHANGE_HEADER;
  constructor(public payload: string){}
}

export class EditingItem implements Action {
  readonly type = EDITING_ITEM;
  constructor(public payload: boolean){}
}

export class SnackBar implements Action {
  readonly type = SNACK_BAR;
  constructor(public payload: string){}
}

export type UIActions = StartLoading |
                        StopLoading |
                        ChangeHeaderTitle |
                        EditingItem | 
                        SnackBar;
