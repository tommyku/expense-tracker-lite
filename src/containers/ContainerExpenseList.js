import ExpenseList from '../components/ExpenseList';
import { connect } from 'react-redux';

const sortedRecords = (records, indices)=> {
  return indices.map((key)=> {
    return records[key];
  })
  .reverse()
  .filter((item)=> (item) ? true : false);
  // sometimes indices updates before records, resulting in undefined records on render
}

const mapStateToProps = (state)=> {
  return {
    categories: state.categories,
    records: sortedRecords(state.records, state.indices.records)
  };
}

const ContainerExpenseList = connect(
  mapStateToProps,
  {}
)(ExpenseList);

export default ContainerExpenseList;
