import * as UIActions from './ui.actions';

export interface State {
  isLoading: boolean;
  headerString: string;
  editingItem: boolean;
  snackString: string;
};

const initialState: State = {
  isLoading: false,
  headerString: '',
  editingItem: false,
  snackString: null,
};

export function uiReducer(state = initialState, action: UIActions.UIActions) {
  switch (action.type) {
    case UIActions.START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UIActions.STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case UIActions.CHANGE_HEADER:
      return {
        ...state,
        headerString: action.payload
      };
    case UIActions.EDITING_ITEM:
      return {
        ...state,
        editingItem: action.payload
      };
    case UIActions.SNACK_BAR:
      return {
        ...state,
        snackString: action.payload
      };
    default: {
      return state;
    }
  }
}

