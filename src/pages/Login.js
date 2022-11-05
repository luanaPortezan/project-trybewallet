import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { login } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }), this.validateEmail);
  };

  validateEmail = () => {
    const { password, email } = this.state;
    const minSizePassword = 6;
    const regex = /\S+@\S+\.\S+/;

    if (password.length >= minSizePassword && regex.test(email)) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  };

  buttonEntrar = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(
      login(email),
    );
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div className="login">

        <div className="title">
          <h1 className="trybe">Trybe</h1>
          <h1 className="wallet">Wallet</h1>
        </div>

        <form className="form">

          <label htmlFor="email">
            <input
              className="email"
              data-testid="email-input"
              id="email"
              name="email"
              type="text"
              value={ email }
              onChange={ this.handleChange }
              placeholder="E-mail:"
            />
          </label>

          <br />

          <label className="pass" htmlFor="password">

            <input
              className="password"
              data-testid="password-input"
              id="password"
              name="password"
              type="text"
              value={ password }
              onChange={ this.handleChange }
              placeholder="Senha:"
            />
          </label>

          <button
            className="button"
            type="button"
            disabled={ isDisable }
            onClick={ this.buttonEntrar }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
