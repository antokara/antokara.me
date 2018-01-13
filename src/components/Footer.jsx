import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'Components/SVG.jsx';
import IconLinks from './IconLinks';
import style from './Footer.pcss';

const Footer = props => (
  <footer className={style.footer}>
    <div className={style.leftIcons} >
      <IconLinks icons={props.icons} />
    </div>
    <div className={style.location} >
      {props.locations[0]}
      <SVG url={props.locationIcon.assetUrl} />
      {props.locations[1]}
    </div>
  </footer>
);

Footer.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })),
  locations: PropTypes.arrayOf(PropTypes.string),
  locationIcon: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  }),
};

Footer.defaultProps = {
  icons: [],
  locations: [],
  locationIcon: {
    assetUrl: '',
  },
};


export default Footer;
