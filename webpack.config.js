// import plugins
var path = require('path');
var webpack = require('webpack');
// auto create index.html in the distribution directory
// This will auto insert the script outputs from webpack
// from an optional template (see plugin section below)
var HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SOURCE_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.join(SOURCE_DIR, 'client/public');
// var SASS_DIR = path.join(__dirname, 'sass');
// var CSS_DIR = path.join(BUILD_DIR, 'css');
const IMG_DIR = path.join(SOURCE_DIR, 'img');
const HBS_VIEWS_DIR = path.join(SOURCE_DIR, 'client/views');
const HBS_PARTIALS_DIR = path.join(HBS_VIEWS_DIR, 'partials');
const HBS_HELPERS_DIR = path.join(HBS_VIEWS_DIR, 'helpers');

// webpack config object
var config = {
  mode: 'development',
  entry: { bpsMain: SOURCE_DIR + 'client/index.js' },
  output: {
    path: path.join(BUILD_DIR, '/bundles'),
    // publicPath specified public URL of the output directory when referenced in browser
    publicPath: '/', // load additional modules here
    // hash: corresponds to a build.  Each chunk same hash across a build
    // chunkhash: each entry point has its own hash.
    // contenthash: specific created in ExtractTextPlugin or mini-css-extract-plugin
    // It is is calc'd based on extracted content, not by the full chunk content
    // Hashes allow slicing so [hash:8] will give the first 8 characters.
    filename: 'bpsMain.bundle.[hash].js',
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
  devtool: 'eval-source-map',
  plugins: [
    // HtmlWebpackPlugin inserts the bundled scripts into the specfied by
    // filename, using the specified template.
    // This is used for the client.  The handlebars loader (below) and the template
    // extension will trigger the use of handlebars over the default ejs.
    // Express rendering takes care of the server side templating, and will take the
    // resulting template and embed it in the layout.
    new HtmlWebpackPlugin({
      title: 'Generic Title',
      // template to use
      template: path.join(HBS_VIEWS_DIR, 'index.hbs'),
      // output file name -- used by express and inserted into a layout
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
          partialDirs: [HBS_PARTIALS_DIR],
          debug: false
        }
      },
      /* Using node-sass-middleware instead to manage sass and css
            {
                test: /\.css$/,
                include: CSS_DIR,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader'] // order reversed! [0] is used after [1]
            },
            {
                test: /\.scss$/,
                include: CSS_DIR,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'] // order reversed! [0] is used after [1], and [1] is used after [2]
            },
            */
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: IMG_DIR,
        // exclude: /node_modules/,
        use: 'file-loader'
      }
    ]
  },
  devServer: {
    publicPath: '/bundles/', // where bundles are served from. Start and end with a /
    contentBase: PUBLIC_DIR, // only necessary to serve static files (not webpack). Can be an array of paths [path1, path2, ...]
    watchContentBase: true,
    compress: true, // files being sent to browser
    port: 9000, // default is 8080
    overlay: { warnings: true, errors: true }, // overlay in browser when there are errors/warnings
    disableHostCheck: false, // default is true, but false is more secure
    open: false, // true: open tab in browser
    hot: true // hot reload of modules. Needs webpack.HotModuleReplacmentPlugin() above
  }
};

module.exports = config;
