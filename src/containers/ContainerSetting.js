import Setting from '../components/Setting';
import { updateDefaults } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = ({categories, defaults})=> {
  return {
    defaults,
    categories
  };
}

const mapDispatchToProps = (dispatch)=> {
  return {
    handleDefaultsUpdate: (payload)=> {
      dispatch(updateDefaults(payload));
    }
  }
}

const ContainerSetting = connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

export default ContainerSetting;
