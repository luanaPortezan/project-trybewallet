import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, saveExpenses } from '../redux/actions/wallet';
import { modifyExpenses, editModeOFF } from '../redux/actions/table';
// import { actionFetchCurrencyn, saveExpenses } from '../redux/actions'; // pegar as actions
// import getCurrencyList from '../services/currencyAPI'; // pegar api

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
      id: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    // this.setState({ [name]: value });
    this.setState(() => ({
      [name]: value,
    }), this.validadeGeneral);
  };

  saveExpensesBtn = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, id } = this.state;

    const exchangeRates = await getCurrencyList();

    const objExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(saveExpenses(objExpense));
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
    const { dispatch, idToEdit, expenses } = this.props;
    // const mapId = expenses.map((ele) => (ele.id));
    // const index = mapId.indexOf(idToEdit);
    const expense = expenses.find((ele) => (ele.id === idToEdit));

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
    dispatch(modifyExpenses(objExpense));
    dispatch(editModeOFF());
    this.setState(() => ({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
    }));
  };

  render() {
    const { currencies, isLoading, editor } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <div>
        {isLoading && <h2>Carregando...</h2> }

        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="type">
          Categoria:
          <select
            name="type"
            id="type"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="payment">
          Pagamento:
          <select
            name="payment"
            id="payment"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((coin, index) => (
                <option key={ index }>{ coin }</option>
              ))
            }
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
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  editor: PropTypes.bool,
  expenses: PropTypes.arrayOf,
  idToEdit: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
