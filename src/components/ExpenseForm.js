import React, { Component } from 'react';
import { Record } from '../data';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import PropTypes from 'prop-types';

const ButtonStyle = {
  margin: '.5em',
};

const FormField = (props)=> {
  const { style, ...others } = props;
  const FormFieldStyle = Object.assign(style || {}, {
    marginBottom: '1em',
    display: 'block',
  });

  return (
    <div style={FormFieldStyle} {...others}>
      {props.children}
    </div>
  );
};

const DEFAULT_CURRENCY = 'HKD';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {key: DEFAULT_CURRENCY, text: DEFAULT_CURRENCY},
      category: null,
      amount: '',
      details: ''
    };
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
    const roundedAmount = Math.round(parseFloat(this.state.amount) * 100.0) / 100.0;
    if (!isNaN(roundedAmount) && roundedAmount !== 0.0) {
      this.props.handleAddRecord({
        details: this.state.details,
        amount: roundedAmount,
        currency: this.state.currency.key,
        categoryUuid: this.state.category.key,
        mode: Record.INCOME
      });
      this.setState({
        details: '',
        amount: ''
      });
    }
    else
      alert('buy why not a proper amount?');
  }

  handleAddOutcome() {
    const roundedAmount = Math.round(parseFloat(this.state.amount) * 100.0) / 100.0;
    if (!isNaN(roundedAmount) && roundedAmount !== 0.0) {
      this.props.handleAddRecord({
        details: this.state.details,
        amount: roundedAmount,
        currency: this.state.currency.key,
        categoryUuid: this.state.category.key,
        mode: Record.OUTCOME
      });
      this.setState({
        details: '',
        amount: ''
      });
    }
    else
      alert('buy why not a proper amount?');
  }

  categoryKeyFromProps() {
    if (this.state.category === null) {
      const firstCategoryKey = Object.keys(this.props.categories)[0];
      return firstCategoryKey;
    } else {
      return this.state.category.key;
    }
  }

  componentWillReceiveProps({categories}) {
    const categoryKeys = Object.keys(categories);
    if (this.state.category === null || categoryKeys.indexOf(this.state.category.key) === -1) {
      const firstCategoryKey = categoryKeys[0];
      this.setState({category: {
        key: firstCategoryKey,
        text: categories[firstCategoryKey].name
      }});
    }
  }

  render() {
    const { categories } = this.props;
    return (
      <section>
        <FormField>
          <TextField
            type='number'
            label='Amount'
            step='any'
            value={this.state.amount}
            onChanged={(amount)=> this.setState({amount})}
          />
        </FormField>
        <FormField>
          <TextField
            type='text'
            label='Details (Optional)'
            autoCapitalize={false}
            value={this.state.details}
            onChanged={(details)=> this.setState({details})}
          />
        </FormField>
        <FormField>
          <Dropdown
            label='Category'
            onChanged={(category)=> this.setState({category})}
            selectedKey={this.categoryKeyFromProps()}
            options={Object.keys(categories).map((key)=> {
              return {key: categories[key].uuid, text: categories[key].name};
            })}
          />
        </FormField>
        <FormField>
          <Dropdown
            label='Currency'
            onChanged={(currency)=> this.setState({currency})}
            selectedKey={this.state.currency.key}
            options={['HKD', 'USD', 'JPY', 'RMB', 'TWD'].map((item, index)=> {
              return {key: item, text: item};
            })}
          />
        </FormField>
        <FormField style={{textAlign: 'center'}}>
          <PrimaryButton
            style={ButtonStyle}
            onClick={this.handleAddOutcome}
            type='button'>
            Add Outcome
          </PrimaryButton>
          <DefaultButton
            style={ButtonStyle}
            onClick={this.handleAddIncome}
            type='button'>
            Add Income
          </DefaultButton>
        </FormField>
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
