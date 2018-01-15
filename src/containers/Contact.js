import { connect } from 'react-redux';
import getContact from 'Actions/getContact';
import Contact from 'Components/Contact.jsx';

const mapStateToProps = state => ({
  ...state.contact,
});

const mapDispatchToProps = dispatch => ({
  getContact: () => {
    dispatch(getContact());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
