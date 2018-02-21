import React from 'react';
import PropTypes from 'prop-types';
import style from './Demos.pcss';

class Demos extends React.Component {
  constructor(props) {
    super(props);
    props.getDemos();
  }

  render() {
    return (
      <div className={style.demos}>
        Demos
      </div>
    );
  }
}

Demos.propTypes = {
  getDemos: PropTypes.func.isRequired,
};

export default Demos;
