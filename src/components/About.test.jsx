import React from 'react';
import { shallow } from 'enzyme';
import About from './About';
import style from '../css/about.pcss';

describe('About component', () => {
  const c = shallow(<About />);

  test('has the correct css class applied to it', () => {
    expect(c.hasClass(style.about)).toBe(true);
  });

  test('has the correct content', () => {
    expect(c.text()).toBe('About');
  });
});
