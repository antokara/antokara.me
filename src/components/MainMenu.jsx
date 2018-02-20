import React from 'react';
import PropTypes from 'prop-types';
import SVG from './SVG';
import IconLinks from './IconLinks';
import style from './MainMenu.pcss';

const MainMenu = props => (
  <div className={style.mainMenu}>
    <IconLinks
      icons={props.icons}
      className={style.menuItem}
      activeClassName={style.active}
    />
    <SVG className={style.marker} url={props.circle} />
  </div>
);

MainMenu.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })),
  circle: PropTypes.string,
};

MainMenu.defaultProps = {
  icons: [],
  circle: '',
};


export default MainMenu;
