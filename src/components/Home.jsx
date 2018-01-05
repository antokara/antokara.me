import React from 'react';
import PropTypes from 'prop-types';
import style from './Home.pcss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    props.getHome();
  }

  render() {
    return (
      <div className={style.home}>
        Home
      </div>
    );
  }
}

Home.propTypes = {
  getHome: PropTypes.func.isRequired,
};

export default Home;
