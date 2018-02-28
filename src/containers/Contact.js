import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getContact from 'Actions/getContact';
import Contact from 'Components/Contact.jsx';

const mapStateToProps = state => ({
  ...state.contact,
});

const mapDispatchToProps = dispatch => ({
  getContact: bindActionCreators(getContact, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
