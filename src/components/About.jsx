import React from 'react';
import style from './About.pcss';

const About = () => (
  <div className={style.about}>
    <div data-id="space">{process.env.CONTENTFUL_SPACE}</div>
    <div data-id="inner">
      About
    </div>
  </div>
);

export default About;
