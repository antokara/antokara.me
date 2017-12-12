// @see https://facebook.github.io/jest/docs/en/getting-started.html
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// @see https://github.com/facebookincubator/create-react-app/issues/3199
// warning remains but might help in future upgrade
import 'raf/polyfill';

Enzyme.configure({ adapter: new Adapter() });

require('dotenv').config();
