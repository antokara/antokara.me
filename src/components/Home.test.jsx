import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import style from '../css/home.pcss';

describe('Home component', () => {
  // Render the component
  const c = shallow(<Home />);

  test('has the correct css class applied to it', () => {
    expect(c.hasClass(style.home)).toBe(true);
  });

  test('has the correct content', () => {
    expect(c.text()).toBe('Home');
  });
});
