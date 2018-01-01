import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from 'Constants/routes';
import SVG from 'Components/SVG.jsx';
import style from './HeaderIcons.pcss';

const HeaderIcons = (props) => {
  if (!props.icons.length) {
    return false;
  }

  const icons = props.icons.map((icon) => {
    const img = <SVG url={icon.assetUrl} data-test="1" />;
    if (icon.internal) {
      return <Link key={icon.alt} to={routes[icon.url]} title={icon.alt}>{img}</Link>;
    }
    return <a key={icon.alt} href={icon.url} title={icon.alt} target="_blank">{img}</a>;
  });

  return (
    <div className={style.headerIcons}>
      {icons}
    </div>
  );
};

HeaderIcons.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })).isRequired,
};

export default HeaderIcons;
