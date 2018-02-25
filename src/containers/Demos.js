import { connect } from 'react-redux';
import getDemos from 'Actions/getDemos';
import Demos from 'Components/Demos.jsx';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  demos: [...state.demos],
});

const mapDispatchToProps = dispatch => ({
  getDemos: bindActionCreators(getDemos, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Demos);
