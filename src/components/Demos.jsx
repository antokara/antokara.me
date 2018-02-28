import React from 'react';
import PropTypes from 'prop-types';
import style from './Demos.pcss';
import Demo from './Demo';

class Demos extends React.Component {
  constructor(props) {
    super(props);
    props.getDemos();
  }

  render() {
    const demos = this.props.demos.map(d => (
      <Demo
        key={d.title}
        {...d}
        checkmark={this.props.checkmark}
      />
    ));
    return (
      <div className={style.demos}>
        {demos}
      </div>
    );
  }
}

Demos.propTypes = {
  getDemos: PropTypes.func.isRequired,
  demos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
    features: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    })),
    links: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    })),
  })),
  checkmark: PropTypes.string,
};

Demos.defaultProps = {
  demos: [],
  checkmark: null,
};

export default Demos;
