const getApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const listCurrency = response.json();
  return listCurrency;
};

export default getApi;
