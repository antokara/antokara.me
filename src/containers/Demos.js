import { connect } from 'react-redux';
import getDemos from 'Actions/getDemos';
import Demos from 'Components/Demos.jsx';

const mapStateToProps = state => ({
  ...state.demos,
});

const mapDispatchToProps = dispatch => ({
  getDemos: () => {
    dispatch(getDemos()); // @todo refactor this and other containers to use the bindAction...
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Demos);
