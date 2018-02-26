import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import SVG from './SVG';
import style from './Demo.pcss';

const Demo = (props) => {
  const features = props.features.map(feature =>
    (
      <li key={feature.label}>
        <a href={feature.url} target="_blank" rel="noopener">{feature.label}</a>
      </li>
    ));
  const links = props.links.map(link =>
    (
      <li key={link.label}>
        <a href={link.url} target="_blank" rel="noopener">{link.label}</a>
      </li>
    ));

  return (
    <div className={style.demo}>
      <div className={style.row}>
        <div className={style.title}>{props.title}</div>
      </div>
      <div className={style.row}>
        <SVG className={style.icon} url={props.icon.url} />
        <ReactMarkdown className={style.description} source={props.description} />
      </div>
      <ul className={style.features}>{features}</ul>
      <ul className={style.links}>{links}</ul>
    </div>
  );
};

Demo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  features: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

export default Demo;
