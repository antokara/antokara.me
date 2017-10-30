const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');

module.exports = (env => ({
  entry: './src/index.jsx',
  devtool: ((env && env.production) ? false : 'source-map'),
  devServer: {
    // @see https://webpack.js.org/configuration/dev-server
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    https: false,
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { exclude: ['icons'] }),
    new FaviconsWebpackPlugin({
      logo: './src/static/logo.png',
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
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ],
    },
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
        },
      },
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
}));
