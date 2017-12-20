// @see https://facebook.github.io/jest/docs/en/getting-started.html
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

require('es6-promise').polyfill();
require('isomorphic-fetch');
global.fetch = require('jest-fetch-mock');
require('dotenv').config();
