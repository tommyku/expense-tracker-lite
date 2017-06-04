import ExpenseForm from '../components/ExpenseForm'
import { initHoodie, addNewRecord, fetchRecords } from '../actions';
import { connect } from 'react-redux'

const mapStateToProps = ({categories, hoodie})=> {
  return {
    categories: categories,
    hoodie: hoodie
  };
}

const mapDispatchToProps = (dispatch)=> {
  return {
    handleAddRecord: (payload)=> {
      dispatch(addNewRecord(payload));
    },
    handleInitHoodie: (payload)=> {
      dispatch(initHoodie(payload))
    },
    handleFetchRecords: (hoodie)=> {
      dispatch(fetchRecords(hoodie));
    }
  }
};


const ContainerExpenseForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseForm);

export default ContainerExpenseForm;
