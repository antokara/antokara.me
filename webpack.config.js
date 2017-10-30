const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  /**
   * Environment Variables:
   * - env.production, if defined, all code will get minified/uglyfied
   * - env.genSourceMaps, if defined, source maps will get generated.
   *   If not defined, source maps will only get generated on non-prod environments
   * - env.uglifyCode, if defined, code will get minified / uglified.
   *   If not defined, code will only get minified / uglified on prod environment
   */
  const isProdEnv = (env && env.production);
  const uglifyCode = (env && env.uglifyCode) || isProdEnv;
  const genSourceMaps = (env && env.genSourceMaps) || !isProdEnv;

  const config = {
    entry: './src/index.jsx',
    devtool: (genSourceMaps ? 'source-map' : false),
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
        minify: (uglifyCode ? {
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true,
          sortClassName: true,
          useShortDoctype: true,
          collapseWhitespace: true,
        } : false),
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
  };
  if (uglifyCode) {
    config.plugins.push(new UglifyJSPlugin({
      sourceMap: genSourceMaps,
    }));
  }
  return config;
};
