import { Record, Category } from './data'
import { NEW_RECORD } from './actions'

const defaultCategories = [
  new Category('Transportation'),
  new Category('Food'),
  new Category('Snack'),
  new Category('Administration'),
  new Category('Interest'),
  new Category('Home Deposit'),
  new Category('Wage'),
  new Category('Lend/Borrow'),
  new Category('Reimbursement'),
];

const categoryIndices = defaultCategories.reduce((sum, item)=> {
  sum[item.uuid] = []
  return sum
}, {});

const initialState = {
  indices: {
    categories: categoryIndices,
    records: []
  },
  categories: defaultCategories,
  records: []
};

function expenseAppLite(state = initialState, action) {
  console.log(state, action);
  switch (action.type) {
    case NEW_RECORD:
      return handleAddNewRecord(state, action.payload);
    default:
      return state;
  }
}

function handleAddNewRecord(state, {amount, currency, mode, categoryUuid}) {
  const newState = Object.assign({}, state);
  const newRecord = new Record({
    amount: amount,
    currency: currency,
    mode: mode
  });
  newState.records[newRecord.uuid] = newRecord;
  newState.indices.records.push(newRecord.uuid);
  newState.indices.categories[categoryUuid].push(newRecord.uuid);
  return newState;
}

export default expenseAppLite;
