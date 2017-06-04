import React, { Component } from 'react';
import { Record } from '../data';
import PropTypes from 'prop-types';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleAddIncome = this.handleAddIncome.bind(this);
    this.handleAddOutcome = this.handleAddOutcome.bind(this);
  }

  handleAddIncome() {
    const roundedAmount = Math.round(parseFloat(this.refs['amount'].value) * 100.0) / 100.0;
    this.props.handleAddRecord({
      amount: roundedAmount,
      currency: this.refs['currency'].value,
      categoryUuid: this.refs['categoryUuid'].value,
      mode: Record.INCOME
    });
  }

  handleAddOutcome() {
    const roundedAmount = Math.round(parseFloat(this.refs['amount'].value) * 100.0) / 100.0;
    this.props.handleAddRecord({
      amount: roundedAmount,
      currency: this.refs['currency'].value,
      categoryUuid: this.refs['categoryUuid'].value,
      mode: Record.OUTCOME
    });
  }

  render() {
    const { categories } = this.props;
    return (
      <section>
        <div>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            ref='amount'
            defaultValue={0.0}
            step='any'
            name='amount' />
        </div>
        <div>
          <select defaultValue={categories[0].uuid}
            ref='categoryUuid'>
            { categories.map((item, index)=> (
              <option value={item.uuid} key={`category-${index}`}>{item.name}</option>
            )) }
          </select>
        </div>
        <div>
          <select defaultValue='HKD'
            ref='currency'>
            { ['HKD', 'USD', 'JPY', 'RMB', 'TWD'].map((item, index)=> (
              <option value={item} key={`currency-${index}`}>{item}</option>
            )) }
          </select>
        </div>
        <div>
          <button
            onClick={this.handleAddIncome}
            type='button'>
            IN
          </button>
          <button
            onClick={this.handleAddOutcome}
            type='button'>
            OUT
          </button>
        </div>
      </section>
    );
  }
}

ExpenseForm.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired
    })
  ),
  handleAddRecord: PropTypes.func.isRequired
}

export default ExpenseForm;
