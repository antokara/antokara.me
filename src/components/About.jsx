import React from 'react';
import appConfig from 'appConfig';
import style from '../css/about.pcss';

const About = () => (
  <div className={style.about}>
    <div>{appConfig.contentful.space}</div>
    <div data-id="inner">
      About
    </div>
  </div>
);

export default About;
