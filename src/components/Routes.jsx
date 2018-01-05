import React from 'react';
import { Route } from 'react-router';
import Home from 'Containers/Home';
import Skills from 'Components/Skills.jsx';
import Demos from 'Components/Demos.jsx';
import Contact from 'Components/Contact.jsx';
import routes from 'Constants/routes';

const Routes = () => (
  <div>
    <Route exact={routes.home.exact} path={routes.home.path} component={Home} />
    <Route exact={routes.skills.exact} path={routes.skills.path} component={Skills} />
    <Route exact={routes.demos.exact} path={routes.demos.path} component={Demos} />
    <Route exact={routes.contact.exact} path={routes.contact.path} component={Contact} />
  </div>
);

export default Routes;
