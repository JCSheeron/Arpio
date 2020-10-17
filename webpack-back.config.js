// import plugins
const path = require('path');
const webpack = require('webpack');
// exclude node_modules from bundle
const nodeExternals = require('webpack-node-externals');
// extract CSS into separate files
const cssExtractPlugin = require('mini-css-extract-plugin');

// TODO: Work out swtiching between development and production
// const cfg = require('./config.js');
// const isDevelopment = confg.nodeEnv;
const isDevelopment = true;

const BUILD_DIR = path.resolve(__dirname, 'build');
const SOURCE_DIR = path.resolve(__dirname, 'src/server');
const STYLES_DIR = path.resolve(__dirname, 'src/styles');
const STYLE_MODULES_DIR = path.join(STYLES_DIR, 'modules');

// webpack config object
var config = {
  mode: 'development', // TODO: Make dynamic at some point
  target: 'node', // bundle for node instead of the web
  externals: nodeExternals(), // externals are what is webpack not going to bundle
  entry: { bpsServer: path.join(SOURCE_DIR, 'server.js') },
  output: {
    filename: '[name]-bundle.js',
    path: BUILD_DIR // don't use public 'dist' directory
  },
  node: {
    // Set these to false when using 'node' target to keep the regular Node.js behavior
    // The webpack docs say they default to false in this case, but the docs must be
    // wrong.
    __dirname: false,
    __filename: false
  },
  plugins: [
    new cssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    // From webpack docs best practics:
    // - Use regex only in test and for file name matching
    // - Use absolute path or arrays of absolute paths in include and exclued to match full path
    // - Try to avoid exclude and prefer include
    //
    // NOTE: Loader order reversed! [0] is used after [1], and [1] is used after [2]
    rules: [
      {
        //test: /\.(js|jsx)$/,
        test: /\.jsx?$/,
        // include: APP_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // For sass/scss
      //    First convert SCSS to CSS with sass-loader
      //    Then use css-loader to process @import() and @url(), etc into js
      //    Then run thru style-loader to append to the DOM or the
      //    Mini CSS Extract Plugin to externalize the CSS when doing a
      //    produciton build.
      //
      //    Loaders for CSS Modules (modules=true).
      //    The CSS styles are scoped to particular templates -- this means
      //    that if there is a foo.css file and a .bar class within it,
      //    and we import foo.js only into button.js, then .bar class would
      //    be inaccessable to other templates (buz.js) unless it is specifically
      //    imported there as well.
      //
      //    Modules are designed to fix the problem of global scope in CSS. Block
      //    Element Modifyier (BEM) naming isn't needed for example.
      {
        test: /\.s(a|c)ss$/,
        include: STYLE_MODULES_DIR,
        loader: [
          // isDevelopment ? 'style-loader' : cssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      // This rule is like the one above, eccpet do not process the CSS modules.
      // In other words, don't change the class names and selectors to be scoped
      // locally. This is what the modules option does above.
      {
        test: /\.s(a|c)ss$/,
        include: STYLES_DIR,
        exclude: STYLE_MODULES_DIR,
        loader: [
          // isDevelopment ? 'style-loader' : cssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  },
  // simplify imports into js
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  }
};

module.exports = config;
