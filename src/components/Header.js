import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  caclTotal = () => {
    const { cash } = this.props;
    const total = cash.reduce((acc, ele) => {
      const coin = ele.currency;
      const { ask } = ele.exchangeRates[coin];
      const { value } = ele;
      const sum = acc + (Number(value) * Number(ask));
      return sum;
    }, 0);

    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>MyWallet</h1>
        <div>
          <h3 data-testid="total-field">{this.caclTotal()}</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
        <h3
          data-testid="email-field"
        >
          {email}
        </h3>

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  cash: globalState.wallet.cash,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  cash: PropTypes.arrayOf.isRequired,

};

export default connect(mapStateToProps)(Header);
