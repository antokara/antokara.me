import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import routes from 'Constants/routes';
import SVG from 'Components/SVG.jsx';

class HeaderIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.props = props;
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>[error]</div>;
    }

    if (!this.props.icons.length) {
      return false;
    }

    const icons = this.props.icons.map((icon) => {
      const img = <SVG url={icon.assetUrl} />;
      if (icon.internal) {
        return (
          <NavLink
            key={icon.alt}
            to={routes[icon.url].path}
            exact={routes[icon.url].exact}
            title={icon.alt}
            activeClassName={this.props.activeClassName}
          >
            {img}
          </NavLink>
        );
      }
      return <a key={icon.alt} href={icon.url} title={icon.alt} target="_blank">{img}</a>;
    });

    return icons;
  }
}

HeaderIcons.propTypes = {
  activeClassName: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })).isRequired,
};

HeaderIcons.defaultProps = {
  activeClassName: 'active',
};

export default HeaderIcons;
