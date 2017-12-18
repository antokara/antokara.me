import React from 'react';
import { Route } from 'react-router';
import Home from 'Components/Home.jsx';
import About from 'Components/About.jsx';
import routes from 'Constants/routes';

const Routes = () => (
  <div>
    <Route exact path={routes.home} component={Home} />
    <Route path={routes.about} component={About} />
  </div>
);

export default Routes;
