import React, { Component } from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Currencies } from '../data';
import FormField from './FormField';
import PropTypes from 'prop-types';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.defaults.category || this.firstCategory(this.props.categories),
      currency: this.props.defaults.currency
    }
    this.saveDefault= this.saveDefault.bind(this);
  }

  componentWillReceiveProps({categories}) {
    const category = this.state.category || this.firstCategory(categories);
    if (category) {
      this.setState({category: category});
    }
  }

  firstCategory(categories) {
    const categoryKeys = Object.keys(categories);
    if (!this.state || this.state.category === null || categoryKeys.indexOf(this.state.category) === -1) {
      const firstCategoryKey = categoryKeys[0];
      return {
        key: firstCategoryKey,
        text: categories[firstCategoryKey].name
      };
    }
    return null;
  }

  saveDefault() {
    this.props.handleDefaultsUpdate({
      category: this.state.category,
      currency: this.state.currency
    });
  }

  categoryKeyFromProps() {
    if (this.state.category === null) {
      const firstCategoryKey = Object.keys(this.props.categories)[0];
      return firstCategoryKey;
    } else {
      return this.state.category.key;
    }
  }

  render() {
    const { categories } = this.props;
    return (
      <section>
        <FormField>
          <Dropdown
            label='貨幣'
            onChanged={(currency)=> this.setState({currency: currency.key})}
            selectedKey={this.state.currency}
            options={Currencies}
          />
        </FormField>
        <FormField>
          <Dropdown
            label='類別'
            onChanged={(category)=> this.setState({category})}
            selectedKey={this.categoryKeyFromProps()}
            options={Object.keys(categories).map((key)=> {
              return {key: categories[key].uuid, text: categories[key].name};
            })}
          />
        </FormField>
        <PrimaryButton onClick={this.saveDefault}
          text='儲存' />
      </section>
    );
  }
};

Setting.propTypes = {
  defaults: PropTypes.shape({
    currency: PropTypes.string,
    category: PropTypes.object
  }),
  handleDefaultsUpdate: PropTypes.func
};

export default Setting;
