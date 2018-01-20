// @see https://facebook.github.io/jest/docs/en/getting-started.html
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

require('babel-polyfill');
require('isomorphic-fetch');
require('dotenv').config();
