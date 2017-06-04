import { Record, Category } from './data'
import { NEW_RECORD } from './actions'

const defaultCategories = [
  new Category({name: 'Transportation'}),
  new Category({name: 'Food'}),
  new Category({name: 'Snack'}),
  new Category({name: 'Administration'}),
  new Category({name: 'Interest'}),
  new Category({name: 'Home Deposit'}),
  new Category({name: 'Wage'}),
  new Category({name: 'Lend/Borrow'}),
  new Category({name: 'Reimbursement'}),
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
  records: {}
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

function handleAddNewRecord(state, {amount, currency, details, mode, categoryUuid}) {
  const newState = Object.assign({}, state);
  const newRecord = new Record({
    details: details,
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
