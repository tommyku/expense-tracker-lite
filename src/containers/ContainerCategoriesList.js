import CategoriesList from '../components/CategoriesList';
import { updateCategory} from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state)=> {
  return {
    categories: state.categories,
  };
}

const mapDispatchToProps = (dispatch)=> {
  return {
    handleUpdateCategory: (payload)=> {
      dispatch(updateCategory(payload));
    }
  };
}

const ContainerCategoriesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList);

export default ContainerCategoriesList;
