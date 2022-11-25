// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, RECEIVE_CURRENCY_SUCCESS,
  SAVECASH } from '../actions/wallet';
import { REMOVECASH, EDITON, MODIFYCASH,
  EDITOFF } from '../actions/table';

const initialState = {
  currencies: [],
  cash: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return { ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCY_SUCCESS:
    return { ...state,
      currencies: action.payload,
      isFetching: false,
    };
  case SAVECASH:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVECASH: {
    const ids = state.cash.map((element) => (element.id));
    const index = ids.indexOf(action.payload);
    const newExpenses = [...state.cash];
    newExpenses.splice(index, 1);
    return {
      ...state,
      cash: newExpenses,
    };
  }
  case EDITON:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case EDITOFF:
    return {
      ...state,
      editor: false,
      idToEdit: action.payload,
    };
  case MODIFYCASH: {
    const ids = state.cash.map((element) => (element.id));
    const index = ids.indexOf(action.payload.id);
    const newExpenses = [...state.cash];
    newExpenses[index] = action.payload;
    return {
      ...state,
      cash: newExpenses,
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
