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

  // check if there are width or height attributes.
  // if true, keep their values stripping our units and remove them as attributes.
  let width = oDOM.documentElement.getAttribute('width');
  let height = oDOM.documentElement.getAttribute('height');
  if (width !== null) {
    width = width.replace(/[^0-9.,]/g, '');
    oDOM.documentElement.removeAttribute('width');
  }
  if (height !== null) {
    height = height.replace(/[^0-9.,]/g, '');
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
      ({ width } = viewBox);
    }
    opts.aspect.x = Math.round(width);
  }
  if (opts.aspect.y === null) {
    if (height === null && viewBox !== null) {
      ({ height } = viewBox);
    }
    opts.aspect.y = Math.round(height);
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

  // do some clean-up
  oDOM.querySelectorAll('metadata').forEach(el => el.remove());

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
  let htmlAsString = serializer.serializeToString(aspectHolder) +
    serializer.serializeToString(oDOM.documentElement);

  // if safeIds are not set to all
  if (!opts.safeIds.length || opts.safeIds[0] !== '*') {
    // create the list of IDs to be uniqified
    const uniquifyIds = Array.from(oDOM.querySelectorAll('*'))
      .map(el => el.getAttribute('id'))
      .filter(el => opts.safeIds.indexOf(el) === -1);

    // perform the uniqification of IDs
    uniquifyIds.forEach((id) => {
      const rnd = Math.round((Math.random() * (999999 - 1)) + 1);
      htmlAsString = htmlAsString.replace(new RegExp(`"${id}"`, 'g'), `"${id}-${rnd}"`);
      htmlAsString = htmlAsString.replace(new RegExp(`#${id}`, 'g'), `#${id}-${rnd}`);
    });
  }

  return htmlAsString;
};

class SVG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: { __html: '' },
    };
    this.props = props;
    this.fetchSvg(props.url);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.url !== this.props.url) {
      // if the URL changed, do not render until
      // we have fetched the SVG of the new URL...
      this.fetchSvg(nextProps.url);
      return false;
    }
    // eslint-disable-next-line no-underscore-dangle
    if (!nextProps.url.length || !nextState.svg.__html.length) {
      // if there is no url or svg do not render
      return false;
    }
    return true;
  }

  fetchSvg(url) {
    // make sure there is a url to fetch...
    if (url.length) {
      fetch(url)
        .then((response) => {
          response.text().then((text) => {
            const html = parseXML(text, this.props.options);
            if (html !== false) {
              this.setState({ svg: { __html: html } });
            }
          });
        }).catch(() => {
          this.setState({ svg: false });
        });
    }
  }

  render() {
    // remove url and options props
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
