import React from 'react';
import PropTypes from 'prop-types';
import IconLinks from './IconLinks';
import style from './MainMenu.pcss';

const MainMenu = props => (
  <div className={style.mainMenu}>
    <IconLinks icons={props.icons} activeClassName={style.active} />
  </div>
);

MainMenu.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })),
};

MainMenu.defaultProps = {
  icons: [],
};


export default MainMenu;
