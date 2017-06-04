import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import timeago from 'timeago.js';
import { Record } from '../data';

class ExpenseList extends PureComponent {
  render() {
    const { records, categories } = this.props;
    return (
      <div>
        { records.map((item, index)=> (
          <div key={index}>
            <div>
              {`
                You ${item.mode === Record.INCOME ? 'earned' : 'spent'}
                ${item.amount.toLocaleString('zh-HK', {style: 'currency', currency: item.currency})} on ${categories[item.categoryUuid].name}
                ${timeago().format(item.createdAt)}${item.details.length ? ' for '+item.details : ''}.
              `}
            </div>
          </div>
        )) }
      </div>
    );
  }
}

ExpenseList.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.instanceOf(Record)
  ),
  categories: PropTypes.object
};

export default ExpenseList;
