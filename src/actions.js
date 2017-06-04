import Hoodie from '@hoodie/client';
import { Record } from './data'

export const INIT_HOODIE = 'INIT_HOODIE';

export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';

export const RECEIVE_DOCS = 'RECEIVE_DOCS';

export const SET_HOODIE = 'SET_HOODIE';

export const FETCH_RECORDS = 'FETCH_RECORDS'

export function initHoodie({host, user, pass}) {
  return function(dispatch) {
    const hoodie = new Hoodie({
      url: host,
      PouchDB: require('pouchdb-browser')
    });
    return hoodie.account.signIn({username: user, password: pass})
      .then((account)=> {
        dispatch({type: SET_HOODIE, hoodie: hoodie});
        //hoodie.store.remove(['expense:categories', 'expense:indices', 'expense:records']).then(()=> {
        dispatch(fetchRecords(hoodie));
        //});
      })
      .catch(console.warn);
  }
}

export function receiveRecords(status, payload) {
  return {
    type: RECEIVE_RECORDS,
    payload: payload,
    status: status,
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
      .then((object)=> dispatch(fetchRecords(hoodie)))
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

export function addNewRecord({amount, currency, details, mode, categoryUuid}) {
  return function(dispatch, getState) {
    const newRecord = new Record({
      details: details,
      amount: amount,
      currency: currency,
      mode: mode,
      categoryUuid: categoryUuid
    });

    const state = Object.assign({}, getState());

    console.log(state);

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
