import './Header.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../img/logo.jpg';
import imgDinheiro from '../img/imgDinheiro.png';
import imgUser from '../img/imgUser.png';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      cambio: 'BRL',
      sum: 0,
    };
  }

  componentDidMount() {
    this.getSum();
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      this.getSum();
    }
  }

  getSum = () => {
    const { expenses } = this.props;
    const newExpenses = [expenses[expenses.length - 1]];
    if (expenses.length > 0) {
      const { sum } = this.state;
      const getValue = Number(newExpenses.map((el) => el.value));
      const getCurrency = newExpenses.map((el) => el.currency).toString();
      const getExchangeRates = newExpenses.map((el) => el.exchangeRates);
      const getAsk = Number(getExchangeRates.map((el) => el[getCurrency].ask));
      const getSum = (getValue * getAsk) + Number(sum);
      this.setState({ sum: getSum.toFixed(2) });
    }
  };

  render() {
    const { cambio, sum } = this.state;
    const { user } = this.props;
    const { email } = user;
    return (
      <header>

        <div className="title">
          <img className="logo" src={ logo } alt="logo" />
          <h1 className="trybe">Trybe</h1>
          <h1 className="wallet">Wallet</h1>
          <img className="img-dinheiro" src={ imgDinheiro } alt="dinheiro imagem" />
          <p className="texto">Total de Despesas</p>
          <h3 className="despesa" data-testid="total-field">{ sum }</h3>
          <h3 className="cambio" data-testid="header-currency-field">{cambio}</h3>
          <img className="img-user" src={ imgUser } alt="user imagem" />
          <h3 className="email2" data-testid="email-field">{email}</h3>
        </div>

      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  user: {
    email: globalState.user.email,
  },
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired),
}.isRequired;

export default connect(mapStateToProps)(Header);
