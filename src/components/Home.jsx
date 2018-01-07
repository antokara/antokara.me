import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'svg.js';
import style from './Home.pcss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    props.getHome();
    this.props = props;
  }

  componentDidUpdate() {
    this.draw = SVG(style.home);
    const cX = 60;
    const cY = 60;
    const cDiameter = 100;
    const rect = this.draw.circle(cDiameter)
      .attr({ fill: '#000', opacity: 0.12 })
      .stroke({ width: 4, color: '#fff', opacity: 1 })
      .center(cY, cX);
    const first = this.draw.text(this.props.first).font({
      family: 'Titillium Web',
      size: 40,
      weight: 'bold',
    }).center(cX, cY);
    const second = this.draw.text(this.props.second).font({
      family: 'Titillium Web',
      size: 40,
      weight: 'bold',
    }).x(cX + (cDiameter / 1.75)).cy(cY);
    const third = this.draw.text(this.props.third).font({
      family: 'Titillium Web',
      size: 28,
    }).x(cX + (cDiameter * 1.5)).y(cY * 1.35);
  }

  componentWillUnmount() {
    // @todo remove SVG
  }

  render() {
    return (
      <div id={style.home} className={style.home}>
        <div>
          {this.props.first}
        </div>
        <div>
          {this.props.second}
        </div>
        <div>
          {this.props.third} {this.props.rotator}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getHome: PropTypes.func.isRequired,
  first: PropTypes.string,
  second: PropTypes.string,
  third: PropTypes.string,
  rotator: PropTypes.arrayOf(PropTypes.string),
};


Home.defaultProps = {
  first: '',
  second: '',
  third: '',
  rotator: [],
};


export default Home;
