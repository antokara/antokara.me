import React from 'react';
import style from '../css/home.pcss';
import appConfig from '../helpers/appConfig';

const Home = () => (
  <div className={style.home}>
    Home, contentful space from config: {appConfig.contentful.space}
  </div>
);

export default Home;
