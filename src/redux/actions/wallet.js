export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const loginEmail = (payload) => ({ type: ADD_EMAIL, payload });

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrencies = (payload) => ({
  type: RECEIVE_CURRENCIES,
  payload,
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const SAVEEXPENSES = 'SAVEEXPENSES';

export const receiveExpensesSuccess = (currencyList) => ({
  type: RECEIVE_CURRENCY_SUCCESS,
  payload: currencyList,
});

export const saveExpenses = (payload) => ({
  // console.log(dispatch);
  // console.log(payload);
  type: SAVEEXPENSES,
  payload,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(url);
      const data = await response.json();
      delete data.USDT;
      dispatch(receiveCurrencies(data));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
