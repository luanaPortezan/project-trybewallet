import { LOGIN_EMAIL } from '../actions/user';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
export default userReducer;
