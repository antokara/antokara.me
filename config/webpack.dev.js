const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');

module.exports = merge(common, {
  // @see https://webpack.js.org/configuration/dev-server
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
    https: false,
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: null } }),
    new HtmlWebpackPlugin({
      title: 'Antonios Karagiannis',
      minify: false,
      inject: false,
      template: HtmlWebpackTemplatePlugin,
      mobile: true,
      lang: 'en-US',
      appMountId: 'root',
    }),
  ],
});
