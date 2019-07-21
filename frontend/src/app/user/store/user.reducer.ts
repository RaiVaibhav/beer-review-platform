import { UserActions,
        // TRY_CREATE_USER,
        STORE_TOKEN} from './user.actions';

export interface UserState {
  token: String;
}
const initialState: UserState = {
  token: null,
};

export function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case STORE_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default: {
      return state;
    }
  }
}
export const getUserState = (state: UserState) => state;
