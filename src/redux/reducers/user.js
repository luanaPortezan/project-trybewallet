import { LOGIN_EMAIL } from '../actions/user';

const INITIAL_STATE = {
  user: {
    email: 'seu e-mail', // string que armazena o email da pessoa usuária
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}
export default userReducer;
