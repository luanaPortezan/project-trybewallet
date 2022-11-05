import { LOGIN_EMAIL } from '../actions';

const INITIAL_STATE = {
  user: {
    email: 'Configure seu email!', // string que armazena o email da pessoa usuária
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
