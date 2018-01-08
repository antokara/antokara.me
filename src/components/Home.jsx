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
    const vW = 200;
    const vH = 175;
    this.draw = SVG(style.home)
      .size(vW, vH).attr('width', null).attr('height', null)
      .viewbox(0, 0, vW, vH);
    const cX = vW / 4;
    const cY = vH / 3;
    const cDiameter = vH / 3;
    const rect = this.draw.circle(cDiameter)
      .attr({ fill: '#000', opacity: 0.12 })
      .stroke({ width: 3, color: '#fff', opacity: 1 })
      .center(cX, cY);
    const first = this.draw.text(this.props.first).font({
      family: 'Titillium Web',
      size: vW / 10,
      weight: 'bold',
    }).center(cX, cY);
    const second = this.draw.text(this.props.second).font({
      family: 'Titillium Web',
      size: vW / 10,
      weight: 'bold',
    }).x(cX + (cDiameter / 1.75)).cy(cY);
    const third = this.draw.text(this.props.third).font({
      family: 'Titillium Web',
      size: vW / 15,
    }).x(cX + cDiameter).y(cY * 1.35);
  }

  componentWillUnmount() {
    // @todo remove SVG
  }

  render() {
    return (
      <div id={style.home} className={style.home} />
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
