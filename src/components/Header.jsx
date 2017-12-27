import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    props.getHeader();
  }

  render() {
    return (
      <header className="layout row">
        <div>
          <div className="name"> {this.props.fields.first} - {this.props.fields.second} </div>
        </div>
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
    forth: PropTypes.string,
  }).isRequired,
};

export default Header;
