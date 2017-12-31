import { connect } from 'react-redux';
import getHeader from 'Actions/getHeader';
import Header from 'Components/Header.jsx';

const mapStateToProps = state => ({
  ...state.header,
});

const mapDispatchToProps = dispatch => ({
  getHeader: () => {
    dispatch(getHeader());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
