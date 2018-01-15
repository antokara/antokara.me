import React from 'react';
import PropTypes from 'prop-types';
import IconLink from './IconLink';

class IconLinks extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    if (!this.props.icons.length) {
      return false;
    }

    return this.props.icons.map(icon => (
      <IconLink key={icon.alt} {...icon} activeClassName={this.props.activeClassName} />
    ));
  }
}

IconLinks.propTypes = {
  activeClassName: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })).isRequired,
};

IconLinks.defaultProps = {
  activeClassName: 'active',
};

export default IconLinks;
