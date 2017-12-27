import { connect } from 'react-redux';
import ContentfulClient from 'Helpers/ContentfulClient';
import { getHeader, getHeaderSuccess, getHeaderFailure } from 'Actions/getHeader';
import Header from 'Components/Header.jsx';

const mapStateToProps = state => ({
  fields: state.header,
});

const mapDispatchToProps = dispatch => ({
  getHeader: () => {
    dispatch(getHeader(new ContentfulClient())).request.then((entry) => {
      dispatch(getHeaderSuccess(entry.fields));
    }).catch((error) => {
      dispatch(getHeaderFailure(error));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
