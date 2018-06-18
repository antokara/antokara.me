import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import routes from 'Constants/routes';
import SVG from './SVG';

class IconLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>[error]</div>;
    }

    const img = <SVG url={this.props.assetUrl} />;
    if (this.props.internal) {
      return (
        <NavLink
          key={this.props.alt}
          to={routes[this.props.url].path}
          exact={routes[this.props.url].exact}
          title={this.props.alt}
          activeClassName={this.props.activeClassName}
          className={this.props.className}
        >
          {img}
        </NavLink>
      );
    }
    return (
      <a
        key={this.props.alt}
        href={this.props.url}
        title={this.props.alt}
        target="_blank"
        rel="noopener noreferrer"
        className={this.props.className}
      >
        {img}
      </a>
    );
  }
}

IconLink.propTypes = {
  activeClassName: PropTypes.string,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  assetUrl: PropTypes.string.isRequired,
  internal: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

IconLink.defaultProps = {
  activeClassName: 'active',
  className: null,
};

export default IconLink;
