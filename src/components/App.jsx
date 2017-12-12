import React from 'react';
import { Link } from 'react-router-dom';
import Routes from './Routes';
import app from './App.pcss';

const App = () => (
  <div className={app.app}>
    <h1>App</h1>
    <hr />
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <hr />
    <Routes />
  </div>
);

export default App;
