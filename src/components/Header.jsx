import React from 'react';
import PropTypes from 'prop-types';
import IconLinks from './IconLinks';
import style from './Header.pcss';

const Header = props => (
  <header className={style.header}>
    <div className={style.text}>
      <div className={style.upper}>
        <div>{props.first}</div>
        <div>{props.second}</div>
      </div>
      <div className={style.lower}>
        <div>{props.third}</div>
        <div>{props.fourth}</div>
      </div>
    </div>
    <div className={style.icons}>
      <IconLinks icons={props.icons} />
    </div>
  </header>
);

Header.propTypes = {
  first: PropTypes.string,
  second: PropTypes.string,
  third: PropTypes.string,
  fourth: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })),
};

Header.defaultProps = {
  first: '',
  second: '',
  third: '',
  fourth: '',
  icons: [],
};


export default Header;
