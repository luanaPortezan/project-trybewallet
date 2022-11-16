// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES, FAILED_REQUEST, SAVEEXPENSES } from '../actions/wallet';
import { REMOVEEXPENSES } from '../actions/table';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isLoading: true };
  case RECEIVE_CURRENCIES:
    return { ...state,
      isLoading: false,
      currencies:
      Object.keys(action.payload) };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.payload,
      isLoading: false };
  case SAVEEXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload],
    };
  case REMOVEEXPENSES: {
    const ids = state.expenses.map((ele) => (ele.id));
    const index = ids.indexOf(action.payload);
    const newExpenses = [...state.expenses];
    newExpenses.splice(index, 1);
    return {
      ...state,
      expenses: newExpenses,
    };
  }
  default:
    return state;
  }
};
export default wallet;
