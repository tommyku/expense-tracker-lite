import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import groupBy from 'lodash.groupby';
import { Record } from '../data';

class ExpenseReport extends PureComponent {
  render() {
    // kill this with fire
    const recordsByDates = groupBy(this.props.records, (record)=> moment(new Date(record.createdAt)).format('YYYY MMM'));
    return (
      <table>
        <tbody>
          {
            Object.keys(recordsByDates).map((key)=> {
              const recordsByCategory = groupBy(recordsByDates[key], (record)=> record.categoryUuid);
              return (
                <tr key={key}>
                  <td>{key}</td>
                  {
                    Object.keys(recordsByCategory).map((uuid)=> {
                      const recordsByCurrency = groupBy(recordsByCategory[uuid], (record)=> record.currency);
                      return (
                        <td key={uuid}>
                          {this.props.categories[uuid].name}
                          {
                            Object.keys(recordsByCurrency).map((currency)=> {
                              const amount = recordsByCurrency[currency].reduce((sum, {amount})=> sum + amount, 0)
                              return (
                                <div key={`${uuid}-${currency}`}>
                                  {amount.toLocaleString('zh-HK', {style: 'currency', currency: currency})}
                                </div>
                              );
                            })
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
};

ExpenseReport.propTypes = {
  records: PropTypes.object,
  categories: PropTypes.object
};

export default ExpenseReport;
