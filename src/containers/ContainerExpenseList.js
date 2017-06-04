import ExpenseList from '../components/ExpenseList';
import { connect } from 'react-redux';

const sortedRecords = (records, indices)=> {
  return indices.reverse().map((key)=> {
    return records[key];
  });
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
