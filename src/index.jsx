import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { createClient } from 'contentful';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/layout/header';
import './css/index.css';

const client = createClient({
  space: 'lihy1bja3cqb',
  accessToken: 'c144c3fa68c18c2a2d43f6796bc092fc6dbafa97be71d39cd2b0c244c8b5a32a',
});

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

ReactDOM.render(
  <Router>
    <div>
      <Header client={client} />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>,
  document.getElementById('root'),
);

