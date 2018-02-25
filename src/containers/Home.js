import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getHome from 'Actions/getHome';
import Home from 'Components/Home.jsx';

const mapStateToProps = state => ({
  ...state.home,
});

const mapDispatchToProps = dispatch => ({
  getHome: bindActionCreators(getHome, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
