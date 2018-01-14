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
    if (!this.draw) {
      // initialize for the first time
      this.draw = SVG(style.home);
    } else {
      // remove all previous on future calls
      this.draw.clear();
    }
    this.draw.size(vW, vH).attr('width', null).attr('height', null)
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

    // delay the rotator initialization...
    setTimeout(() => {
      // in case the cleanup takes place
      // before this actually runs...
      if (!this.draw) {
        return;
      }
      // setup the rotator
      this.rotator = {
        el: this.draw.text('')
          .font({
            family: 'Titillium Web',
            size: vW / 15,
            'text-anchor': 'middle',
          })
          .cx(vW / 2)
          .y(cY * 2.5),
        text: `// ${this.props.rotator[0]}`,
        index: 0,
        state: 0,
        time: new Date().getTime(),
        timer: setInterval(this.textRotator.bind(this), 75),
      };
    }, 1500);
  }

  componentWillUnmount() {
    // clear timer
    if (this.rotator) {
      clearInterval(this.rotator.timer);
    }
    // remove svg children elements
    this.draw.clear();
    // remove svg element itself
    document
      .getElementById(style.home)
      .removeChild(document.getElementById(this.draw.id()));
    // release svg.js
    delete this.draw;
  }

  textRotator() {
    const time = new Date().getTime();
    const timePassed = time - this.rotator.time;
    if (this.rotator.state === 0) {
      // showing
      if (this.rotator.el.text().length < this.rotator.text.length) {
        // show more
        this.rotator.el.text(this.rotator.text.substr(0, this.rotator.el.text().length + 1));
      } else {
        // full length shown, pause it now
        this.rotator.state = 1;
        this.rotator.time = time;
      }
    } else if (this.rotator.state === 1 && timePassed > 1750) {
      // paused, move the index
      if (this.rotator.index < this.props.rotator.length - 1) {
        this.rotator.index += 1;
      } else {
        this.rotator.index = 0;
      }
      // start hiding
      this.rotator.state = 2;
      this.rotator.time = time;
    } else if (this.rotator.state === 2) {
      // hiding
      if (this.rotator.el.text().length > 3) {
        // hide more
        this.rotator.el.text(this.rotator.text.substr(0, this.rotator.el.text().length - 1));
      } else {
        // full length hidden, start showing
        this.rotator.state = 0;
        this.rotator.time = time;
        this.rotator.text = `// ${this.props.rotator[this.rotator.index]}`;
      }
    }
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
