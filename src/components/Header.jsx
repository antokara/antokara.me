import React from 'react';
import PropTypes from 'prop-types';
import style from './Header.pcss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    props.getHeader();
  }

  render() {
    return (
      <header className={style.header}>
        <div>{this.props.fields.first}</div>
        <div>{this.props.fields.second}</div>
        <div>{this.props.fields.third}</div>
        <div>{this.props.fields.fourth}</div>
      </header>
    );
  }
}

Header.propTypes = {
  getHeader: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
    third: PropTypes.string,
    fourth: PropTypes.string,
  }).isRequired,
};

export default Header;
