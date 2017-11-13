const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.jsx'),
  devtool: 'source-map',
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, '../src/media/logo.png'),
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
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
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
