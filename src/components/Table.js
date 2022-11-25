import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeCash, editOn } from '../redux/actions/table';

class Table extends Component {
  removeBtn = (id) => {
    const { dispatch } = this.props;
    dispatch(removeCash(id));
  };

  editBtn = (id) => {
    const { dispatch } = this.props;
    dispatch(editOn(id));
  };

  render() {
    const { cash } = this.props;
    return (
      <div>
        <table>
          <caption>Tabela de gastos:</caption>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tbody>
            {cash.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(element.exchangeRates[element.currency]
                    .ask) * element.value).toFixed(2)}

                </td>
                <td>BRL</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => { this.editBtn(element.id); } }
                    data-testid="edit-btn"
                  >
                    Editar

                  </button>
                  <button
                    type="button"
                    onClick={ () => { this.removeBtn(element.id); } }
                    data-testid="delete-btn"
                  >
                    X
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  cash: globalState.wallet.cash,
});

Table.propTypes = {
  cash: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps)(Table);
