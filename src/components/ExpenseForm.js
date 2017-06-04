import React, { Component } from 'react';
import { Record } from '../data';
import PropTypes from 'prop-types';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleAddIncome = this.handleAddIncome.bind(this);
    this.handleAddOutcome = this.handleAddOutcome.bind(this);
  }

  componentWillMount() {
    const host = localStorage.getItem('expenseHoodieHost');
    const user = localStorage.getItem('expenseHoodieUser');
    const pass = localStorage.getItem('expenseHoodiePass');
    if (host) {
      this.props.handleInitHoodie({host: host, user: user, pass: pass});
    }
  }

  handleAddIncome() {
    const roundedAmount = Math.round(parseFloat(this.refs['amount'].value) * 100.0) / 100.0;
    if (!isNaN(roundedAmount) && roundedAmount !== 0.0) {
      this.props.handleAddRecord({
        details: this.refs['details'].value,
        amount: roundedAmount,
        currency: this.refs['currency'].value,
        categoryUuid: this.refs['categoryUuid'].value,
        mode: Record.INCOME
      });
      this.refs['details'].value = '';
      this.refs['amount'].value = '';
    }
    else
      alert('buy why not a proper amount?');
  }

  handleAddOutcome() {
    const roundedAmount = Math.round(parseFloat(this.refs['amount'].value) * 100.0) / 100.0;
    if (!isNaN(roundedAmount) && roundedAmount !== 0.0) {
      this.props.handleAddRecord({
        details: this.refs['details'].value,
        amount: roundedAmount,
        currency: this.refs['currency'].value,
        categoryUuid: this.refs['categoryUuid'].value,
        mode: Record.OUTCOME
      });
      this.refs['details'].value = '';
      this.refs['amount'].value = '';
    }
    else
      alert('buy why not a proper amount?');
  }

  render() {
    const { categories } = this.props;
    return (
      <section>
        <div>
          <label htmlFor='amount'>Amount</label>
          <br />
          <input
            type='number'
            ref='amount'
            defaultValue=''
            step='any'
            id='amount'
            name='amount' />
        </div>
        <div>
          <label htmlFor='details'>Details</label>
          <br />
          <input
            type='text'
            ref='details'
            autoCapitalize={false}
            id='details'
            name='details' />
        </div>
        <div>
          <select ref='categoryUuid'>
            { Object.keys(categories).map((key, index)=> (
              <option value={categories[key].uuid} key={`category-${index}`}>{categories[key].name}</option>
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
  categories: PropTypes.object.isRequired,
  handleAddRecord: PropTypes.func.isRequired,
  handleFetchRecords: PropTypes.func.isRequired,
  handleInitHoodie: PropTypes.func.isRequired
}

export default ExpenseForm;
