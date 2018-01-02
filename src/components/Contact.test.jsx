import React from 'react';
import { shallow } from 'enzyme';
import Contact from './Contact';
import style from './Contact.pcss';

describe('Contact component', () => {
  const c = shallow(<Contact />);

  test('has the correct css class applied to it', () => {
    expect(c.hasClass(style.contact)).toBe(true);
  });

  test('inner div has the correct content', () => {
    expect(c.find('div[data-id="inner"]').text()).toBe('Contact');
  });
});
