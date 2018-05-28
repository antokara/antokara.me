// webpack
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./common.js');

// plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// postCSS plugins
const PostCssImport = require('postcss-import');
const PostCssNext = require('postcss-cssnext');
const PostCssMixins = require('postcss-mixins');
const PostCssNested = require('postcss-nested');
const PostCssCssVariables = require('postcss-css-variables');
const DoIUse = require('doiuse');
const PostCssFlexBugFixes = require('postcss-flexbugs-fixes');
const Lost = require('lost');
const PostCssFontMagician = require('postcss-font-magician');
const PostCssFontMagicianConfig = require('../postCssFontMagician');

module.exports = env => merge(common(env), {
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: (env && env.NODE_ENV ? env.NODE_ENV : 'production'),
      DEBUG: false,
    }),
    new CleanWebpackPlugin(
      [
        path.resolve(__dirname, '../../dist'),
      ],
      {
        exclude: ['icons'],
        root: path.resolve(__dirname, '../../'),
      },
    ),
    new HtmlWebpackPlugin({
      title: 'Antonios Karagiannis',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        sortClassName: true,
        useShortDoctype: true,
        collapseWhitespace: true,
      },
      inject: false,
      template: HtmlWebpackTemplatePlugin,
      mobile: true,
      lang: 'en-US',
      appMountId: 'root',
    }),
    new StyleLintPlugin({
      emitErrors: true,
      failOnError: true,
      context: 'src',
      files: '**/*.css',
      quiet: false,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../reports/webpackBundleAnalyzer.html',
      openAnalyzer: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.p?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { importLoaders: 1, modules: true },
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
                DoIUse({
                  browsers: ['> 5%'],
                }),
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
