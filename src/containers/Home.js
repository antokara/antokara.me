import { connect } from 'react-redux';
import getHome from 'Actions/getHome';
import Home from 'Components/Home.jsx';

const mapStateToProps = state => ({
  ...state.home,
});

const mapDispatchToProps = dispatch => ({
  getHome: () => {
    dispatch(getHome());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
