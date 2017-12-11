import React from 'react';
import appConfig from 'appConfig';
import style from '../css/home.pcss';

const Home = () => (
  <div className={style.home}>
    Home, contentful space from config: {appConfig.contentful.space}
  </div>
);

export default Home;
