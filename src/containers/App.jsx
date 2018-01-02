import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from 'Components/Routes.jsx';
import Header from 'Containers/Header';
import MainMenu from 'Containers/MainMenu';

const App = () => (
  <div>
    <Header />
    <MainMenu />
    <Routes />
  </div>
);

// for usage of withRouter
// @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
export default withRouter(connect()(App));
