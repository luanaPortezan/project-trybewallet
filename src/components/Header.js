import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../img/logo.jpg';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>

        <div className="title">
          <img className="logo" src={ logo } alt="logo" />
          <h1 className="Trybe">Trybe</h1>
          <h1 className="wallet">Wallet</h1>
        </div>

        <div>
          <h3 className="despesa" data-testid="total-field">0</h3>
          <h3 className="moeda" data-testid="header-currency-field">BRL</h3>
          <h3 className="email" data-testid="email-field">{ email }</h3>
        </div>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,

};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});

export default connect(mapStateToProps)(Header);
