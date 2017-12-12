const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

module.exports = (env) => {
  const environment = (env && env.NODE_ENV) ?
    env.NODE_ENV.toLocaleLowerCase() : 'development';
  return {
    entry: path.resolve(__dirname, '../../src/index.jsx'),
    devtool: 'source-map',
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
        safe: false,
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../../dist'),
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      alias: {
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
            failOnWarning: true,
            failOnError: true,
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
                presets: ['es2015', 'react'],
                plugins: ['transform-es2015-spread'],
              },
            },
          ],
        },
        // {
        //     test: /\.html$/,
        //     use: ['file-loader?name=[path][name].[ext]!extract-loader!html-loader']
        // },
        // {
        //     test: /\.(html)$/,
        //     use: {
        //         loader: 'html-loader',
        //         options: {
        //             attrs: [':data-src'],
        //             minimize: true
        //         }
        //     }
        // },
        // {
        //     test: /\.(png|jpg|gif)$/,
        //     use: [{
        //         loader: 'file-loader',
        //         options: {}
        //     }]
        // }
      ],
    },
  };
};
