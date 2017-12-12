import React from 'react';
import { shallow } from 'enzyme';
import About from './About';
import style from '../css/about.pcss';

describe('About component', () => {
  const c = shallow(<About />);

  test('has the correct css class applied to it', () => {
    expect(c.hasClass(style.about)).toBe(true);
  });

  test('inner div has the correct content', () => {
    expect(c.find('div[data-id="inner"]').text()).toBe('About');
  });

  test('space div has the correct content', () => {
    expect(c.find('div[data-id="space"]').text()).toBe('lihy1bja3cqb');
  });
});
