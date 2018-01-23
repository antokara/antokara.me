import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import Routes from 'Components/Routes.jsx';

const mapDispatchToProps = dispatch => ({
  redirect: (route) => {
    dispatch(push(route));
  },
});

export default withRouter(connect(null, mapDispatchToProps)(Routes));
