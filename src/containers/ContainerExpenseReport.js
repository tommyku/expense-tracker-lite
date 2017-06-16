import ExpenseReport from '../components/ExpenseReport';
import { connect } from 'react-redux';

const mapStateToProps = (state)=> {
  return {
    categories: state.categories,
    records: state.records
  };
}

const ContainerExpenseReport = connect(
  mapStateToProps,
  {}
)(ExpenseReport);

export default ContainerExpenseReport;
