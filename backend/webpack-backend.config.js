// import plugins
const path = require('path');
const webpack = require('webpack');

// when compiling for backend, ignore node_modules
const nodeExternals = require('webpack-node-externals');

// auto create index.html in the distribution directory
// This will auto insert the script outputs from webpack
// from an optional template (see plugin section below)
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.join(__dirname, 'src');
const IMG_DIR = path.join(SRC_DIR, 'img');
// var SASS_DIR = path.join(__dirname, 'sass');
// var CSS_DIR = path.join(BUILD_DIR, 'css');
const HBS_VIEWS_DIR = path.join(__dirname, 'views');
const HBS_PARTIALS_DIR = path.join(HBS_VIEWS_DIR, 'partials');
const HBS_HELPERS_DIR = path.join(HBS_VIEWS_DIR, 'helpers');

// webpack config object
var config = {
  mode: 'development',
  // Complile for a Node.js like environment, (uses Node.js require to load chunks)
  // Ignore built in modules like path, fs, etc.
  target: 'node',
  externals: [nodeExternals()], // ignore all modules in node_modules folder
  entry: { bpsMain: path.join(SRC_DIR, '/server.js') },
  output: {
    // with lazy loading
    path: path.join(BUILD_DIR, '/bundles'), // compilaiton assets
    // publicPath specified public URL of the output directory when referenced in browser
    publicPath: '/bundles/', // load additional modules here
    // hash: corresponds to a build.  Each chunk same hash across a build
    // chunkhash: each entry point has its own hash.
    // contenthash: specific created in ExtractTextPlugin or mini-css-extract-plugin
    // It is is calc'd based on extracted content, not by the full chunk content
    // Hashes allow slicing so [hash:8] will give the first 8 characters.
    // filename: '[name].bundle.[hash].js',
    // chunkFilename: '[name].[chunkhash].js'
    filename: 'server.js',
    // Library entries allow us to SSR react app as a library.
    // Serve a function so the express app can access it.
    library: 'app',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Generic Title',
      // template to use
      template: path.join(HBS_VIEWS_DIR, 'index.template.hbs'),
      // output file name
      filename: path.join(BUILD_DIR, 'index.hbs')
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
          partialDirs: [HBS_PARTIALS_DIR],
          debug: false
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: IMG_DIR,
        // exclude: /node_modules/,
        use: 'file-loader?emitFile=false'
      }
    ]
  }
};

module.exports = config;
