import React from 'react';
import PropTypes from 'prop-types';
import style from './SVG.pcss';

const parseXML = (text, options = null) => {
  const defaultOptions = {
    wrapper: 'div',
    safeIds: [],
    padding: 0,
    aspect: {
      x: null,
      y: null,
    },
    max: {
      width: 0,
      height: 0,
    },
  };
  const opts = { ...defaultOptions, ...options };
  const oDOM = new DOMParser().parseFromString(text, 'image/svg+xml');
  if (oDOM.documentElement.nodeName === 'parsererror' || oDOM.documentElement.nodeName !== 'svg') {
    return false;
  }

  // check if there are width, height attributes.
  // if true, keep their values but remove them
  let width = oDOM.documentElement.getAttribute('width');
  let height = oDOM.documentElement.getAttribute('height');
  if (width !== null) {
    oDOM.documentElement.removeAttribute('width');
  }
  if (height !== null) {
    oDOM.documentElement.removeAttribute('height');
  }

  // get the viewBox and get its individual values
  let viewBox = oDOM.documentElement.getAttribute('viewBox');
  if (viewBox !== null) {
    viewBox = viewBox.split(' ');
    if (viewBox.length !== 4) {
      viewBox = viewBox.split(',');
    }
    if (viewBox.length === 4) {
      viewBox = {
        minX: viewBox[0],
        minY: viewBox[1],
        width: viewBox[2],
        height: viewBox[3],
      };
    } else {
      // if we couldn't retrieve the viewBox values, reset it
      viewBox = null;
    }
  }
  if (opts.aspect.x === null) {
    // if no width attribute was found but we have the viewBox
    if (width === null && viewBox !== null) {
      [width] = viewBox;
    }
    opts.aspect.x = width;
  }
  if (opts.aspect.y === null) {
    opts.aspect.y = height;
    if (height === null && viewBox !== null) {
      [height] = viewBox;
    }
    opts.aspect.y = height;
  }

  // in case no aspect width and height was found or given
  if (opts.aspect.x === null || opts.aspect.y === null) {
    throw new Error('No aspect.x and aspect.y for the SVG was found or given');
  }

  // if max dimensions are set to null, use the aspect
  if (opts.max.width === null) {
    opts.max.width = `${opts.aspect.x}px`;
  }
  if (opts.max.height === null) {
    opts.max.height = `${opts.aspect.y}px`;
  }

  // check and modify element IDs, to avoid warnings/errors when the same SVG
  // is used multiple times in the same page (avoid duplicate element IDs)
  // @todo

  // in case no viewBox was found
  if (viewBox === null) {
    viewBox = {
      minX: 0,
      minY: 0,
      width: opts.aspect.x,
      height: opts.aspect.y,
    };
  }

  // in case padding is needed
  if (opts.padding) {
    // adjust viewBox for padding
    viewBox.minX -= opts.padding;
    viewBox.minY -= opts.padding;
    viewBox.width += opts.padding;
    viewBox.height += opts.padding;
  }

  // set the new viewBox
  oDOM.documentElement.setAttribute(
    'viewBox',
    `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`,
  );
  // set the class
  oDOM.documentElement.setAttribute('class', style.svgInlinerSVG);

  // create the canvas and context for our aspect holder
  const canvas = document.createElement('canvas');
  canvas.width = opts.aspect.x;
  canvas.height = opts.aspect.y;

  // create the aspect holder
  const aspectHolder = document.createElement('img');
  aspectHolder.setAttribute('class', style.svgInlinerAspect);
  aspectHolder.setAttribute('src', canvas.toDataURL('image/png', 0));
  if (opts.max.width) {
    aspectHolder.style.maxWidth = opts.max.width;
  }
  if (opts.max.height) {
    aspectHolder.style.maxHeight = opts.max.height;
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(aspectHolder) +
    serializer.serializeToString(oDOM.documentElement);
};

class SVG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: { __html: '' },
    };
    fetch(props.url)
      .then((response) => {
        response.text().then((text) => {
          this.setState({ svg: { __html: parseXML(text, props.options) } });
        });
      }).catch(() => {
        this.setState({ svg: false });
      });
  }

  render() {
    // remove url prop
    const attrs = { ...this.props };
    delete attrs.url;
    delete attrs.options;
    return (
      // eslint-disable-next-line react/no-danger
      <div className={style.svgInlinerWrap} dangerouslySetInnerHTML={this.state.svg} {...attrs} />
    );
  }
}

SVG.propTypes = {
  url: PropTypes.string.isRequired,
  options: PropTypes.shape({
    wrapper: PropTypes.string,
    safeIds: PropTypes.arrayOf(PropTypes.string),
    padding: PropTypes.number,
    aspect: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    max: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
    }),
  }),
};

SVG.defaultProps = {
  options: {
  },
};

export default SVG;
