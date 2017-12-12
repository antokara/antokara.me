import React from 'react';
import { Route } from 'react-router';
import Home from 'Components/Home.jsx';
import About from 'Components/About.jsx';

const Routes = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>
);

export default Routes;
