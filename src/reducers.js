import Store from 'store';
import { Record, Category } from './data'
import {
  RECEIVE_RECORDS,
  SET_HOODIE,
  RECEIVE_DOCS,
  SET_DEFAULTS,
  SET_HOODIE_SIGNIN
} from './actions'

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

const defaultCategoriesObject = defaultCategories.reduce((sum, item)=> {
  sum[item.uuid] = item;
  return sum;
}, {});

const categoryIndices = defaultCategories.reduce((sum, item)=> {
  sum[item.uuid] = []
  return sum
}, {});

const initialState = {
  indices: {
    categories: categoryIndices,
    records: []
  },
  categories: defaultCategoriesObject,
  records: {},
  hoodie: null,
  defaults: Store.get('defaults') || {
    currency: 'HKD',
    category: null
  },
  hoodieSetting: {
    host: localStorage.getItem('expenseHoodieHost') || '',
    user: '',
    pass: ''
  }
};

function expenseAppLite(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_RECORDS:
      return handleReceiveRecords(state, action.status, action.payload);
    case SET_HOODIE:
      return Object.assign({}, state, {hoodie: action.hoodie});
    case RECEIVE_DOCS:
      return Object.assign({}, handleRecordsPayload(state, action.payload));
    case SET_DEFAULTS:
      return Object.assign({}, state, {defaults: action.payload});
    case SET_HOODIE_SIGNIN:
      return Object.assign({}, state, {hoodieSetting: action.payload});
    default:
      return state;
  }
}

function handleReceiveRecords(state, status, payload) {
  switch (status) {
    case 'success':
      let newState = Object.assign({}, state);
      payload.forEach((object)=> newState = handleRecordsPayload(newState, object));
      return newState;
    default:
      return state;
  }
}

function handleRecordsPayload(state, object) {
  const uuidRegexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  switch (object._id) {
    case 'expense:indices':
      state.indices = object;
      break;
    case 'expense:records':
      state.records = {};
      Object.keys(object).forEach((key)=> {
        if (key.match(uuidRegexp)) {
          state.records[key] = new Record(object[key]);
        }
      })
      break;
    case 'expense:categories':
      state.categories = {};
      Object.keys(object).forEach((key)=> {
        if (key.match(uuidRegexp)) {
          state.categories[key] = new Category(object[key]);
        }
      })
      break;
    default:
      // do nothing
  }
  return state;
}

export default expenseAppLite;
