const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

module.exports = (env) => {
  const environment = (env && env.NODE_ENV) ?
    env.NODE_ENV.toLocaleLowerCase() : 'development';
  return {
    entry: {
      polyfills: path.resolve(__dirname, './polyfills.js'),
      main: ['react-hot-loader/patch', 'babel-polyfill', path.resolve(__dirname, '../../src/index.jsx')],
    },
    devtool: 'cheap-source-map',
    plugins: [
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, '../../assets/logo.png'),
        prefix: 'icons/[hash]/',
        emitStats: false,
        statsFilename: 'icons/stats-[hash].json',
        persistentCache: true,
        inject: true,
        background: '#fff',
        title: 'Antonios Karagiannis',
        // @see https://github.com/haydenbleasel/favicons#usage
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: true,
          twitter: true,
          yandex: false,
          windows: false,
        },
      }),
      new Dotenv({
        path: path.resolve(__dirname, '../../.env'),
        safe: true,
        systemvars: true,
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../../dist'),
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      alias: {
        Assets: path.resolve(__dirname, '../assets/'),
        Actions: path.resolve(__dirname, '../../src/actions/'),
        Components: path.resolve(__dirname, '../../src/components/'),
        Constants: path.resolve(__dirname, '../../src/constants/'),
        Containers: path.resolve(__dirname, '../../src/containers/'),
        Helpers: path.resolve(__dirname, '../../src/helpers/'),
        Reducers: path.resolve(__dirname, '../../src/reducers/'),
        ReduxLogger$: (environment !== 'production' ?
          'redux-logger' : path.resolve(__dirname, '../../src/helpers/empty.js')),
        ReduxDevtoolsExtension$: (environment !== 'production' ?
          'redux-devtools-extension' : path.resolve(__dirname, '../../src/helpers/empty.js')),
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader',
          options: {
            cache: true,
            emitError: true,
            failOnWarning: environment !== 'development',
            failOnError: environment !== 'development',
            // Unfortunately, some config options must be duplicated here
            // even though they are defined within package.json[eslintConfig]
            // which is what IDEs use to configure ESLint but this one
            // uses the CLIEngine options instead...
            // @see https://github.com/eslint/eslint/issues/9484
            // @see https://eslint.org/docs/developer-guide/nodejs-api#cliengine
            plugins: [
              'jsx-a11y',
            ],
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['env', { modules: false }], 'react'],
                plugins: ['transform-object-rest-spread'],
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'assets/',
            },
          }],
        },
      ],
    },
  };
};
