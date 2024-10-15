import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Table from '../../components/Table';
import { removeCash, editOn } from '../../redux/actions/table';

const mockStore = configureStore([]);

describe('Table Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      wallet: {
        cash: [
          {
            id: 1,
            description: 'Grocery',
            tag: 'Food',
            method: 'Cash',
            value: '50',
            currency: 'USD',
            exchangeRates: {
              USD: {
                name: 'Dollar',
                ask: '5.00',
              },
            },
          },
          {
            id: 2,
            description: 'Transport',
            tag: 'Travel',
            method: 'Credit Card',
            value: '20',
            currency: 'EUR',
            exchangeRates: {
              EUR: {
                name: 'Euro',
                ask: '6.00',
              },
            },
          },
        ],
      },
    });
  });

  it('should render the table with cash data', () => {
    render(
      <Provider store={ store }>
        <Table />
      </Provider>,
    );

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3); // 1 header row + 2 data rows
    expect(screen.getByText(/Grocery/i)).toBeInTheDocument();
    expect(screen.getByText(/Transport/i)).toBeInTheDocument();
  });

  it('should call removeCash action when delete button is clicked', () => {
    const dispatch = jest.fn();
    store.dispatch = dispatch;

    render(
      <Provider store={ store }>
        <Table />
      </Provider>,
    );

    const deleteButton = screen.getAllByTestId('delete-btn')[0];
    fireEvent.click(deleteButton);

    expect(dispatch).toHaveBeenCalledWith(removeCash(1)); // 1 is the id of the first item
  });

  it('should call editOn action when edit button is clicked', () => {
    const dispatch = jest.fn();
    store.dispatch = dispatch;

    render(
      <Provider store={ store }>
        <Table />
      </Provider>,
    );

    const editButton = screen.getAllByTestId('edit-btn')[0];
    fireEvent.click(editButton);

    expect(dispatch).toHaveBeenCalledWith(editOn(1)); // 1 is the id of the first item
  });
});
