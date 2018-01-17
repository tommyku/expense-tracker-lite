import Setting from '../components/Setting';
import { updateDefaults, updateHoodieSignIn } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = ({categories, defaults, hoodieSetting})=> {
  return {
    defaults,
    categories,
    hoodieSetting
  };
}

const mapDispatchToProps = (dispatch)=> {
  return {
    handleDefaultsUpdate: (payload)=> {
      dispatch(updateDefaults(payload));
    },
    handleHoodieSignIn: (payload)=> {
      dispatch(updateHoodieSignIn(payload));
    }
  }
}

const ContainerSetting = connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

export default ContainerSetting;
