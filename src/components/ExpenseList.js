import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import timeago from 'timeago.js';
import ColorHash from 'color-hash';
import { Record } from '../data';
import { List, WindowScroller, AutoSizer } from 'react-virtualized';

timeago.register('zh_TW', require('timeago.js/locales/zh_TW.js'));

const CategoryBaseStyle = {
  display: 'inline-block',
  background: '#999999',
  fontSize: 'small',
  color: '#ffffff',
  padding: '0 .5em',

}

const DetailsStyle = {
  whiteSpace: 'nowrap',
  color: '#666666'
}

const colorHash = new ColorHash({lightness: 0.5, saturation: 0.5});

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
                rowHeight={({index})=> 70}
                width={width}
                rowRenderer={({index, key, style})=> {
                  Object.assign(style, {
                    borderBottom: '1px solid #ddd'
                  });
                  const CategoryStyle = Object.assign({}, CategoryBaseStyle, {
                    backgroundColor: colorHash.hex(records[index].categoryUuid)
                  });
                  return (
                    <div key={index} style={style}>
                      <div>
                        {`${timeago(null, 'zh_TW').format(records[index].createdAt)} ${records[index].mode === Record.INCOME ? '收入' : '支出'} ${records[index].amount.toLocaleString('zh-HK', {style: 'currency', currency: records[index].currency})}`}
                      </div>
                      <span style={CategoryStyle}>
                        {categories[records[index].categoryUuid].name}
                      </span>
                      <div style={DetailsStyle}>
                        {records[index].details}
                      </div>
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
