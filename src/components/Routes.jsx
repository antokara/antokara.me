import React from 'react';
import { Route } from 'react-router';
import Home from 'Components/Home.jsx';
import Skills from 'Components/Skills.jsx';
import Demos from 'Components/Demos.jsx';
import Contact from 'Components/Contact.jsx';
import routes from 'Constants/routes';

const Routes = () => (
  <div>
    <Route exact path={routes.home} component={Home} />
    <Route exact path={routes.skills} component={Skills} />
    <Route exact path={routes.demos} component={Demos} />
    <Route exact path={routes.contact} component={Contact} />
  </div>
);

export default Routes;
