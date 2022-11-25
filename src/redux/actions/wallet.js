import getCurrencyList from '../../services/Api';

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY_SUCCESS = 'RECEIVE_CURRENCY_SUCCESS';
export const SAVECASH = 'SAVECASH';

export const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

export const receiveCurrencySuccess = (currencyList) => ({
  type: RECEIVE_CURRENCY_SUCCESS,
  payload: currencyList,
});

export const fetchCurrency = async (dispatch) => {
  try {
    dispatch(requestCurrency());

    const currencyList = await getCurrencyList();

    // REMOVER O USDT

    const currencyListCoins = Object.keys(currencyList);
    const indexUSDT = currencyListCoins.indexOf('USDT');
    currencyListCoins.splice(indexUSDT, 1);
    dispatch(receiveCurrencySuccess(currencyListCoins));
  } catch (error) {
    console.log(error);
  }
};

export const actionFetch = () => fetchCurrency;

export const receiveExpensesSuccess = (currencyList) => ({
  type: RECEIVE_CURRENCY_SUCCESS,
  payload: currencyList,
});

export const saveCash = (payload) => ({
  // console.log(dispatch);
  // console.log(payload);
  type: SAVECASH,
  payload,
});
