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
    // viewport
    const vW = 200;
    const vH = 175;

    // svg draw
    this.draw = SVG(style.home)
      .size(vW, vH).attr('width', null).attr('height', null)
      .viewbox(0, 0, vW, vH);

    // center X,Y for circle (main ref point)
    const cX = vW / 4;
    const cY = vH / 3;
    // circle diameter
    const cDiameter = vH / 3;

    this.draw.circle(1)
      .attr({ fill: '#000', opacity: 0 })
      .stroke({ width: 3, color: '#fff', opacity: 1 })
      .center(cX, cY)
      .animate(850, '>', 500)
      .attr({ opacity: 0.12 })
      .radius(cDiameter / 2);

    const first = this.draw.text(this.props.first)
      .font({
        family: 'Titillium Web',
        size: vW / 10,
        weight: 'bold',
      })
      .cy(cY)
      .attr({ opacity: 0 });
    first.cx(cX - first.bbox().width)
      .animate(1000, '>', 500)
      .cx(cX)
      .attr({ opacity: 1 });

    const second = this.draw.text(this.props.second)
      .font({
        family: 'Titillium Web',
        size: vW / 10,
        weight: 'bold',
      })
      .cy(cY)
      .attr({ opacity: 0 });
    second.x((cX + (cDiameter / 1.75)) - second.bbox().width)
      .animate(1000, '>', 500)
      .x(cX + (cDiameter / 1.75))
      .attr({ opacity: 1 });

    const third = this.draw.text(this.props.third)
      .font({
        family: 'Titillium Web',
        size: vW / 15,
      })
      .y(cY * 1.35)
      .attr({ opacity: 0 });
    third.x((cX + cDiameter) - third.bbox().width)
      .animate(900, '>', 700)
      .x(cX + cDiameter)
      .attr({ opacity: 1 });
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
