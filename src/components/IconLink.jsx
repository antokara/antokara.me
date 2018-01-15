import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import routes from 'Constants/routes';
import SVG from './SVG';

class IconLink extends React.Component {
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

    const img = <SVG url={this.props.assetUrl} />;
    if (this.props.internal) {
      return (
        <NavLink
          key={this.props.alt}
          to={routes[this.props.url].path}
          exact={routes[this.props.url].exact}
          title={this.props.alt}
          activeClassName={this.props.activeClassName}
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
};

IconLink.defaultProps = {
  activeClassName: 'active',
};

export default IconLink;
