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
      expense: 0,
      cambio: 'BRL',
    };
  }

  render() {
    const { expense, cambio } = this.state;
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
          <h3 className="despesa" data-testid="total-field">{expense}</h3>
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
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
