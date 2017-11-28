import React from 'react';
import PropTypes from 'prop-types';
import { ClientAPI } from 'contentful';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.client = props.client;
    this.state = { name: null };
    this.client.getEntry('6twmIWqENi6muimaEsEESu')
      .then((entry) => {
        this.setState({ name: entry.fields.first });
      })
      .catch((error) => {
        // @todo use package for error reporting or push state up to app
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  render() {
    return (
      <header className="layout row">
        <div>
          <div className="name"> {this.state.name} </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  client: PropTypes.objectOf(ClientAPI).isRequired,
};

export default Header;
