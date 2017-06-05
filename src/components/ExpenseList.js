import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import timeago from 'timeago.js';
import { Record } from '../data';
import { List, WindowScroller, AutoSizer } from 'react-virtualized';

class ExpenseList extends PureComponent {
  render() {
    const { records, categories } = this.props;
    return (
      <WindowScroller>
        {({ height, isScrolling, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List autoHeight
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                height={height}
                rowCount={records.length}
                rowHeight={({index})=> 40}
                width={width}
                rowRenderer={({index, key, style})=> {
                  return (
                    <div key={index} style={style}>
                      {`
                        You ${records[index].mode === Record.INCOME ? 'earned' : 'spent'}
                        ${records[index].amount.toLocaleString('zh-HK', {style: 'currency', currency: records[index].currency})} on ${categories[records[index].categoryUuid].name}
                        ${timeago().format(records[index].createdAt)}${records[index].details.length ? ' for '+records[index].details : ''}.
                      `}
                    </div>
                  );
                }}>
              </List>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
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
