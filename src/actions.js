import Hoodie from '@hoodie/client';
import Store from 'store';
import { Record, Category } from './data'

export const INIT_HOODIE = 'INIT_HOODIE';

export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';

export const RECEIVE_DOCS = 'RECEIVE_DOCS';

export const SET_HOODIE = 'SET_HOODIE';

export const FETCH_RECORDS = 'FETCH_RECORDS';

export const SET_DEFAULTS = 'SET_DEFAULTS';

export const SET_HOODIE_SIGNIN = 'SET_HOODIE_SIGNIN';

export function initHoodie({host, user, pass}) {
  return function(dispatch) {
    const hoodie = new Hoodie({
      url: host,
      PouchDB: require('pouchdb-browser')
    });
    dispatch({type: SET_HOODIE, hoodie: hoodie});

    hoodie.store.on('change', (event, object)=> {
      if (event !== 'remove' && event !== 'update') {
        dispatch(receiveDocs(object));
      }
    });

    return hoodie.account.get('session').then((session)=> {
      //return hoodie.store.remove(['expense:categories', 'expense:indices', 'expense:records']).then(console.log);
      if (session) {
        dispatch(fetchRecords(hoodie));
      } else {
        hoodie.account.signIn({username: user, password: pass})
        .then((account)=> {
          dispatch({type: SET_HOODIE, hoodie: hoodie});
          localStorage.removeItem('expenseHoodieUser');
          localStorage.removeItem('expenseHoodiePass');
          dispatch(fetchRecords(hoodie));
        })
        .catch(console.warn);
      }
    });
  }
}

export function receiveRecords(status, payload) {
  return {
    type: RECEIVE_RECORDS,
    payload,
    status,
  }
}

export function receiveDocs(object) {
  return {
    type: RECEIVE_DOCS,
    payload: object
  }
}

export function initDoc(hoodie, id) {
  return function(dispatch, getState) {
    let objectToInit;
    switch (id) {
      case 'expense:indices':
        objectToInit = getState().indices;
        break;
      case 'expense:records':
        objectToInit = getState().records;
        break;
      case 'expense:categories':
        objectToInit = getState().categories;
        break;
      default:
        return
    }

    return hoodie.store.updateOrAdd(Object.assign({_id: id}, objectToInit))
      .then((object)=> dispatch(receiveDocs(object)))
      .catch(console.warn);
  }
}

export function fetchRecords(hoodie) {
  return function(dispatch) {
    const arrayOfDocs = ['expense:indices', 'expense:categories', 'expense:records'];
    return hoodie.store.find(arrayOfDocs)
      .then((objects)=> {
        const fail = objects.reduce((sum, item)=> sum || (item instanceof Error), false);
        const status = fail ? 'fail' : 'success';
        if (fail) {
          objects.forEach((item, index)=> {
            (item instanceof Error) && dispatch(initDoc(hoodie, arrayOfDocs[index]));
          })
        }
        dispatch(receiveRecords(status, objects));
      })
  }
}

export function updateCategory({category}) {
  return function(dispatch, getState) {
    const updatedCategory = new Category(category);
    const state = Object.assign({}, getState());

    state.categories[updatedCategory.uuid] = updatedCategory;

    if (!state.indices.hasOwnProperty(updatedCategory.uuid)) {
      state.indices[updatedCategory.uuid] = [];
    }

    const expenseCategories = Object.assign(state.categories, {_id: 'expense:categories'});
    const expenseIndices = Object.assign(state.indices, {_id: 'expense:indices'});

    return state.hoodie.store.updateOrAdd([expenseCategories, expenseIndices])
      .then(()=> dispatch(fetchRecords(state.hoodie)))
      .catch(console.warn);
  }
}

export function addNewRecord({amount, currency, details, mode, categoryUuid}) {
  return function(dispatch, getState) {
    const newRecord = new Record({
      details,
      amount,
      currency,
      mode,
      categoryUuid
    });

    const state = Object.assign({}, getState());

    state.records[newRecord.uuid] = newRecord;
    state.indices.records.push(newRecord.uuid);
    state.indices.categories[categoryUuid].push(newRecord.uuid);

    const expenseIndices = Object.assign(state.indices, {_id: 'expense:indices'});
    const expenseRecords = Object.assign(state.records, {_id: 'expense:records'});

    return state.hoodie.store.updateOrAdd([expenseIndices, expenseRecords])
      .then(()=> dispatch(fetchRecords(state.hoodie)))
      .catch(console.warn);
  };
}

export function updateDefaults(payload) {
  Store.set('defaults', payload);
  return {
    type: SET_DEFAULTS,
    payload: payload
  }
}

export function updateHoodieSignIn(payload) {
  localStorage.setItem('expenseHoodieHost', payload.host);
  localStorage.setItem('expenseHoodieUser', payload.user);
  localStorage.setItem('expenseHoodiePass', payload.pass);
  return {
    type: SET_HOODIE_SIGNIN,
    payload: payload
  }
}
