import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/wallet';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    currency: 'USD',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies, isLoading } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <div>
        {isLoading && <h2>Carregando...</h2> }

        <label htmlFor="expense">
          Valor:
          <input
            type="number"
            name="expense"
            id="expense"
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
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired),
  isLoading: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
