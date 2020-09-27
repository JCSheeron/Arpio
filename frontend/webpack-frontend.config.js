// import plugins
var path = require('path');
var webpack = require('webpack');

const BUILD_DIR = path.join(__dirname, 'dist');
const APP_DIR = path.join(__dirname, 'src');
// var SASS_DIR = path.join(__dirname, 'sass');
// var CSS_DIR = path.join(BUILD_DIR, 'css');
const IMG_DIR = path.join(BUILD_DIR, 'img');

// webpack config object
var config = {
  mode: 'development',
  target: 'web', // compile for a browser
  entry: { bpsMain: APP_DIR + '/index.js' },
  output: {
    // with lazy loading
    path: BUILD_DIR,
    filename: 'bpsMain.bundle-frontend.[hash].js',
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
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: IMG_DIR,
        // exclude: /node_modules/,
        use: 'file-loader'
      }
    ]
  },
  devServer: {
    publicPath: '/dist/', // where bundles are served from
    contentBase: APP_DIR, // only necessary to serve static files (not webpack). Can be an array of paths [path1, path2, ...]
    compress: true, // files being sent to browser
    port: 9000, // default is 8080
    disableHostCheck: false, // default is true, but false is more secure
    /* optional headers
    headers: {
     "Custom-header: "custom"
    }
    */
    open: false, // true: open tab in browser
    hot: true // hot reload of modules. Needs webpack.HotModuleReplacmentPlugin() above
  }
};

module.exports = config;
