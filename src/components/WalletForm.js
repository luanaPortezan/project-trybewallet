import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetch, saveCash } from '../redux/actions/wallet';
import { modifyCash, editOn } from '../redux/actions/table';
import getApi from '../services/Api';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetch());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      () => ({
        [name]: value,
      }),
      this.validadeGeneral,
    );
  };

  saveExpensesBtn = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, id } = this.state;

    const exchangeRates = await getApi();

    const objExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(saveCash(objExpense));
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
  };

  editExpensesBtn = () => {
    const { dispatch, idToEdit, cash } = this.props;
    // const mapId = cash.map((element) => (element.id));
    // const index = mapId.indexOf(idToEdit);
    const expense = cash.find((element) => (element.id === idToEdit));

    const { value, description, currency, method, tag } = this.state;
    const objExpense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: expense.exchangeRates,
    };
    dispatch(modifyCash(objExpense));
    dispatch(editOn());
    this.setState(() => ({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
    }));
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div>
        <form action="">
          <label htmlFor="value">
            Valor da despesa:
            <input
              id="value"
              name="value"
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              name="description"
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((item) => (
                <option value={ item } key={ item }>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tipo:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {!editor && (
            <button type="button" onClick={ this.saveExpensesBtn }>
              Adicionar despesa
            </button>
          )}
          {editor && (
            <button type="button" onClick={ this.editExpensesBtn }>
              Editar despesa
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  editor: globalState.wallet.editor,
  idToEdit: globalState.wallet.idToEdit,
  cash: globalState.wallet.cash,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  cash: PropTypes.arrayOf.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
