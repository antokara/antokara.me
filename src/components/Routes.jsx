import React from 'react';
import { matchPath } from 'react-router';
import Home from 'Containers/Home';
import Skills from 'Components/Skills.jsx';
import Demos from 'Components/Demos.jsx';
import Contact from 'Containers/Contact';
import routes from 'Constants/routes';
import style from './Routes.pcss';

const routesArr = [
  {
    ...routes.home,
    component: <Home />,
  },
  {
    ...routes.demos,
    component: <Demos />,
  },
  {
    ...routes.skills,
    component: <Skills />,
  },
  {
    ...routes.contact,
    component: <Contact />,
  },
];

class Routes extends React.Component {
  constructor(props) {
    super(props);
    // keep array of loaded panes' indices
    this.loadedPanes = [];
  }

  render() {
    let activePaneIndex = 0;
    // build the panes
    const panes = routesArr.map((route, index) => {
      // check if this route/pane should shown due to route match
      const match = matchPath(window.location.pathname, {
        path: route.path,
        exact: route.exact,
        strict: false,
      });
      // if route matches, set active pane index and keep it with loadedPanes...
      if (match) {
        activePaneIndex = index;
        this.loadedPanes[index] = true;
      }
      // show this pane's component if the route matches OR if the pane has been loaded before
      // we need to show previously loaded panes for the slide effect to be more apparent.
      // If performance issues arise, we can always limit the number of loadedPanes...
      return (
        <div key={route.path} className={match ? style.activePane : null}>
          {(this.loadedPanes[index] || match) && route.component}
        </div>
      );
    });
    // change the attribute 'data-active-index' for the css selectors...
    return (
      <div className={style.routes}>
        <div className={style.panes} data-active-index={activePaneIndex}>
          {panes}
        </div>
      </div>
    );
  }
}

export default Routes;
