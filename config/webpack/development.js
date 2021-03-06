// webpack
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./common.js');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');

// postCSS plugins
const PostCssImport = require('postcss-import');
const PostCssNext = require('postcss-cssnext');
const PostCssMixins = require('postcss-mixins');
const PostCssNested = require('postcss-nested');
const PostCssCssVariables = require('postcss-css-variables');
const PostCssFlexBugFixes = require('postcss-flexbugs-fixes');
const Lost = require('lost');
const PostCssFontMagician = require('postcss-font-magician');
const PostCssFontMagicianConfig = require('../postCssFontMagician');

module.exports = env => merge(common(env), {
  mode: 'development',
  // @see https://webpack.js.org/configuration/dev-server
  devServer: {
    contentBase: path.join(__dirname, '../../dist'),
    compress: true,
    port: 9000,
    https: false,
    open: false,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: (env && env.NODE_ENV ? env.NODE_ENV : 'development'),
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.p?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              minimize: false,
              // sourceMap: true, // disabled due to conflict with PostCssFontMagician
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
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
                PostCssCssVariables(),
                PostCssFlexBugFixes(),
                PostCssFontMagician(PostCssFontMagicianConfig),
              ],
            },
          },
        ],
      },
    ],
  },
});
