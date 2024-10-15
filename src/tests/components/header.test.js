import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../../components/Header';

// Criando um mock store
const mockStore = configureStore([]);
const store = mockStore({
  user: {
    email: 'test@example.com',
  },
  wallet: {
    cash: [],
  },
});

describe('Header Component', () => {
  it('should render MyWallet title', () => {
    render(
      <Provider store={ store }>
        <Header />
      </Provider>,
    );

    const titleElement = screen.getByText(/MyWallet/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render total field', () => {
    render(
      <Provider store={ store }>
        <Header />
      </Provider>,
    );

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
  });

  it('should render currency as BRL', () => {
    render(
      <Provider store={ store }>
        <Header />
      </Provider>,
    );

    const currencyField = screen.getByTestId('header-currency-field');
    expect(currencyField).toHaveTextContent('BRL');
  });

  it('should render the email passed via props', () => {
    render(
      <Provider store={ store }>
        <Header />
      </Provider>,
    );

    const emailField = screen.getByTestId('email-field');
    expect(emailField).toHaveTextContent('test@example.com');
  });
});
