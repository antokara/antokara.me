import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import { matchPath } from 'react-router';
import Home from 'Containers/Home';
import Skills from 'Containers/Skills';
import Demos from 'Components/Demos.jsx';
import Contact from 'Containers/Contact';
import routes from 'Constants/routes';
import style from './Routes.pcss';
import SVG from './SVG';

// our routes in order of appearance in the menu and panes
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

    // active pane index
    // @todo setState? although this is internal use only and is driven by Router
    this.activePaneIndex = 0;

    // initialize
    this.hammer = new Hammer(document.body, {
      preventDefault: true,
    });
    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    this.hammer.on('swipeleft', () => this.nextPane());
    this.hammer.on('swiperight', () => this.prevPane());
  }

  componentWillUnmount() {
    // cleanup
    if (this.hammer) {
      this.hammer.destroy();
    }
  }

  nextPane() {
    if (this.activePaneIndex < routesArr.length - 1) {
      this.activePaneIndex += 1;
    }
    this.props.redirect(routesArr[this.activePaneIndex].path);
  }

  prevPane() {
    if (this.activePaneIndex > 0) {
      this.activePaneIndex -= 1;
    }
    this.props.redirect(routesArr[this.activePaneIndex].path);
  }

  render() {
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
        this.activePaneIndex = index;
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
    return this.props.bg && (
      <div role="main" className={style.routes} data-active-index={this.activePaneIndex}>
        <div className={style.viewport}>
          <div className={style.panes}>
            {panes}
          </div>
        </div>
        <SVG className={style.bg} url={this.props.bg} options={{ aspect: { x: 0, y: 0 } }} />
      </div>
    );
  }
}

Routes.propTypes = {
  bg: PropTypes.string,
  redirect: PropTypes.func.isRequired,
};

Routes.defaultProps = {
  bg: null,
};

export default Routes;
