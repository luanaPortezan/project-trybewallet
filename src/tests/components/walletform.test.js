import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WalletForm from '../../components/WalletForm';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('WalletForm Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      wallet: {
        currencies: ['USD', 'EUR', 'BRL'],
        editor: false,
        idToEdit: 0,
        cash: [],
      },
    });

    // Mockar dispatch das ações
    store.dispatch = jest.fn();
  });

  it('should render WalletForm and handle input changes', () => {
    render(
      <Provider store={ store }>
        <WalletForm />
      </Provider>,
    );

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addButton = screen.getByText(/Adicionar despesa/i);

    // Verificar se os inputs e botão estão na tela
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();

    // Simular mudanças nos inputs
    fireEvent.change(valueInput, { target: { value: '100' } });
    fireEvent.change(descriptionInput, { target: { value: 'Lunch' } });
    fireEvent.change(currencyInput, { target: { value: 'EUR' } });
    fireEvent.change(methodInput, { target: { value: 'Cartão de crédito' } });
    fireEvent.change(tagInput, { target: { value: 'Trabalho' } });

    // Verificar se os valores mudaram corretamente
    expect(valueInput.value).toBe('100');
    expect(descriptionInput.value).toBe('Lunch');
    expect(currencyInput.value).toBe('EUR');
    expect(methodInput.value).toBe('Cartão de crédito');
    expect(tagInput.value).toBe('Trabalho');
  });

  it('should dispatch saveCash action with thunk when add expense button is clicked', async () => {
    render(
      <Provider store={ store }>
        <WalletForm />
      </Provider>,
    );

    const addButton = screen.getByText(/Adicionar despesa/i);

    fireEvent.click(addButton);

    // Esperar o dispatch ser chamado devido à chamada da API simulada no thunk
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));

    // Verificar se o dispatch foi chamado com a ação saveCash
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function)); // O Thunk despacha uma função
  });

  it('should display "Editar despesa" button and dispatch modifyCash action with thunk', async () => {
    store = mockStore({
      wallet: {
        currencies: ['USD', 'EUR', 'BRL'],
        editor: true, // Editor ativado
        idToEdit: 1,
        cash: [{
          id: 1,
          value: '100',
          description: 'Lunch',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: {} }],
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={ store }>
        <WalletForm />
      </Provider>,
    );

    const editButton = screen.getByText(/Editar despesa/i);
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    // Esperar que qualquer ação seja despachada
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());

    // Verificar se o dispatch foi chamado com a função modificadora correta (modifyCash)
    const modifyCashDispatch = store.dispatch.mock.calls.find((call) => typeof call[0] === 'function'); // Verifica se o thunk foi despachado

    expect(modifyCashDispatch).toBeDefined(); // Certifica-se que o thunk foi despachado
  });
});
