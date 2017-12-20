import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import routes from 'Constants/routes';
import { connect } from 'react-redux';
import Header from 'Containers/Header.jsx';
import Contentful from 'Helpers/contentful';
import PropTypes from 'prop-types';
import Routes from 'Components/Routes.jsx';
import getHeader from 'Actions/getHeader';

// contClient.getEntry(contentfulEntries.header)
//   .then((entry) => {
//     // eslint-disable-next-line no-console
//     console.info('entry.fields.first', entry.fields.first);
//   })
//   .catch((error) => {
//     // eslint-disable-next-line no-console
//     console.error(error);
//   });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.contentful = new Contentful();
    this.contClient = this.contentful.client;
    props.dispatch(getHeader(this.contClient));
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <Header />
        <hr />
        <Link to={routes.home}>Home</Link>
        <Link to={routes.about}>About</Link>
        <hr />
        <Routes />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// subscribe this component to store changes and pass them to its props
const mapStateToProps = state => ({
  header: state.header,
});

// for usage of withRouter
// @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
export default withRouter(connect(mapStateToProps)(App));
