import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import routes from 'Constants/routes';
import { connect } from 'react-redux';
import Routes from 'Components/Routes.jsx';
import Header from 'Containers/Header';

const App = () => (
  <div>
    <Header />
    <hr />
    <Link to={routes.home}>Home</Link>
    <Link to={routes.about}>About</Link>
    <hr />
    <Routes />
  </div>
);

// for usage of withRouter
// @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
export default withRouter(connect()(App));
