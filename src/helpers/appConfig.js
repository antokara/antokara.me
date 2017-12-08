import appConfigDev from '../../config/app/development';
import appConfigProd from '../../config/app/production';

// default to development if none was set
const environment = (process.env && process.env.NODE_ENV) ?
  process.env.NODE_ENV.toLocaleLowerCase() : 'development';

// @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md#when-not-to-use-it
// eslint-disable-next-line import/no-mutable-exports
let appConfig = appConfigDev;

// map environment to config file
// unfortunately, this is as close as we can get to
// a dynamic import for now
switch (environment) {
  case 'production':
    appConfig = appConfigProd;
    break;
  case 'test':
  case 'development':
    break;
  default:
    throw new Error(`invalid --env.NODE_ENV was defined: ${environment}`);
}

export default appConfig;
