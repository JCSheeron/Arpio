// import plugins
var path = require('path');
var webpack = require('webpack');

// when compiling for backend, ignore node_modules
var nodeExternals = require('webpack-node-externals');

// auto create index.html in the distribution directory
// This will auto insert the script outputs from webpack
// from an optional template (see plugin section below)
var HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'dist');
const APP_DIR = path.join(__dirname);
// var SASS_DIR = path.join(__dirname, 'sass');
// var CSS_DIR = path.join(BUILD_DIR, 'css');
const IMG_DIR = path.join(__dirname, 'img');
const HBS_VIEWS_DIR = path.join(__dirname, 'views');
const HBS_PARTIALS_DIR = path.join(HBS_VIEWS_DIR, 'partials');
const HBS_DIST_PARTIALS_DIR = path.join(BUILD_DIR, 'partials');
const HBS_HELPERS_DIR = path.join(HBS_VIEWS_DIR, 'helpers');

// webpack config object
var config = {
  mode: 'development',
  // Complile for a Node.js like environment, (uses Node.js require to load chunks)
  // Ignore built in modules like path, fs, etc.
  target: 'node',
  externals: [nodeExternals()], // ignore all modules in node_modules folder
  entry: { bpsMain: APP_DIR + '/server.js' },
  output: {
    // with lazy loading
    path: BUILD_DIR,
    filename: 'bpsMain.bundle-backend.[hash].js',
    chunkFilename: '[name].[chunkhash].js', // otherwise same as filename with different hash
    // publicPath specified public URL of the output directory when referenced in browser
    publicPath: '/' // load additional modules here
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // create a vendors chuck which contains all code from node_modules_
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Generic Title',
      // template to use
      template: path.join(HBS_VIEWS_DIR, 'index.hbs'),
      // output file name
      filename: path.join(HBS_PARTIALS_DIR, 'index_wscripts.hbs')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // include: APP_DIR,
        exclude: /node_modules/,
        // without lazy loading
        // use: 'babel-loader'
        // with lazy loading, use loader in place of use so options are avail
        loader: 'babel-loader',
        options: {
          // babel.config.json will be used by default
          // if false, put the babelrc stuff here
          // if true, put this stuff in .babelrc
          // babelrc: true,
          // presets: ["@babel/preset-env", "@babel/preset-react"],
          //plugins: ['syntax-dynamic-import'] // needed for lazy loading
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [HBS_HELPERS_DIR],
          // can't get partials to resolve in paths other than from the
          // partials directory. dist/partials does not seem to work.
          // Not sure how to use the partialDirs option.
          // As a work around, I put the HtmlWebpackPlugin output
          // in the partials folder, and didn't use the disp_partials folder
          partialDirs: [HBS_PARTIALS_DIR, HBS_DIST_PARTIALS_DIR],
          debug: false
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: IMG_DIR,
        // exclude: /node_modules/,
        use: 'file-loader'
      }
    ]
  }
};

module.exports = config;
