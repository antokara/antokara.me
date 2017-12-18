import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'Constants/routes';
import Routes from './Routes';
import app from './App.pcss';

const App = () => (
  <div className={app.app}>
    <h1>App</h1>
    <hr />
    <Link to={routes.home}>Home</Link>
    <Link to={routes.about}>About</Link>
    <hr />
    <Routes />
  </div>
);

export default App;
