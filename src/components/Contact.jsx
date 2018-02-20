import React from 'react';
import PropTypes from 'prop-types';
import IconLink from './IconLink';
import style from './Contact.pcss';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    props.getContact();
  }

  render() {
    const icons = this.props.icons.map(icon => (
      <div key={icon.alt}><IconLink {...icon} /></div>
    ));
    return (
      <div className={style.contact}>
        <div className={style.icons}>
          {icons}
        </div>
        <div className={style.text}>
          {this.props.text[0]}<br />
          {this.props.text[1]}, {this.props.text[2]}
        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  getContact: PropTypes.func.isRequired,
  text: PropTypes.arrayOf(PropTypes.string),
  icons: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    assetUrl: PropTypes.string,
    internal: PropTypes.bool,
  })),
};


Contact.defaultProps = {
  text: [],
  icons: [],
};

export default Contact;
