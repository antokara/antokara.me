import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        return <Link key={icon.alt} to={routes[icon.url]} title={icon.alt}>{img}</Link>;
      }
      return <a key={icon.alt} href={icon.url} title={icon.alt} target="_blank">{img}</a>;
    });

    return icons;
  }
}

HeaderIcons.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })).isRequired,
};

export default HeaderIcons;
