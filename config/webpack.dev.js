// webpack
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');

// postCSS plugins
const PostCssImport = require('postcss-import');
const PostCssNext = require('postcss-cssnext');
const PostCssMixins = require('postcss-mixins');
const PostCssNested = require('postcss-nested');
const PostCssFlexBugFixes = require('postcss-flexbugs-fixes');
const Lost = require('lost');
const PostCssFontMagician = require('postcss-font-magician');

module.exports = merge(common, {
  // @see https://webpack.js.org/configuration/dev-server
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
    https: false,
    open: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                PostCssImport({ root: loader.resourcePath }),
                PostCssNext(),
                Lost(),
                PostCssMixins(),
                PostCssNested(),
                PostCssFlexBugFixes(),
                PostCssFontMagician(),
              ],
            },
          },
        ],
      },
    ],
  },
});
