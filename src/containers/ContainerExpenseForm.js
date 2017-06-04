import ExpenseForm from '../components/ExpenseForm'
import { NEW_RECORD } from '../actions';
import { connect } from 'react-redux'

const mapStateToProps = ({categories})=> {
  return { categories: categories };
}

const mapDispatchToProps = (dispatch)=> {
  return {
    handleAddRecord: (payload)=> {
      dispatch({
        type: NEW_RECORD,
        payload: payload
      });
    }
  }
};


const ContainerExpenseForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseForm);

export default ContainerExpenseForm;
