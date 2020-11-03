// import plugins
const path = require('path');
const webpack = require('webpack');

// TODO: Work out swtiching between development and production
// const cfg = require('./config.js');
// const isDevelopment = confg.nodeEnv;
const isDevelopment = true;

// auto create index.html in the distribution directory
// This will auto insert the script outputs from webpack
// from an optional template (see plugin section below)
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Styling is done with a combinaiton of packages:
// node-sass: provides binding for Node.js to LibSass, as Sass compiler
// sass-loader: loader for webpack for compiling SCSS/Sass files
// style-loader: injects styles into our DOM
// css-loader: interprets and resolves @import and @url
// mini-css-extract-plugin: extracts our CSS out of the JS bundle and into a separate
// file.  By default, webpack would include the compiled CSS in the main bundle.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SOURCE_DIR = path.resolve(__dirname, 'src');
const ASSETS_DIR = path.join(SOURCE_DIR, 'static');
const STYLES_DIR = path.join(SOURCE_DIR, 'styles');
const FONTS_DIR = path.join(STYLES_DIR, 'fonts');
const STYLE_MODULES_DIR = path.join(STYLES_DIR, 'modules');
const COMPONENTS_DIR = path.join(SOURCE_DIR, 'client/components');
const IMG_DIR = path.join(ASSETS_DIR, 'img');
const HBS_VIEWS_DIR = path.join(SOURCE_DIR, 'views');
const HBS_SHARED_VIEWS_DIR = path.join(HBS_VIEWS_DIR, 'shared');
const HBS_PARTIALS_DIR = path.join(HBS_VIEWS_DIR, 'partials');
const HBS_HELPERS_DIR = path.join(HBS_VIEWS_DIR, 'helpers');

// webpack config object
var config = {
  mode: 'development',
  target: 'web', // default, but make it obvious
  entry: { bpsMain: path.join(SOURCE_DIR, 'client/appClient.js') },
  output: {
    path: path.join(BUILD_DIR, '/bundles'),
    // publicPath specifies public URL of the output directory when referenced in browser
    publicPath: '/', // load additional modules here
    // hash: corresponds to a build.  Each chunk same hash across a build
    // chunkhash: each entry point has its own hash.
    // contenthash: specific created in ExtractTextPlugin or mini-css-extract-plugin
    // It is is calc'd based on extracted content, not by the full chunk content
    // Hashes allow slicing so [hash:8] will give the first 8 characters.
    filename: 'bpsMain.bundle.[hash].js',
    chunkFilename: '[name].bundle.[chunkhash].js' // otherwise same as filename with different hash
    //sourceMapFilename: ''
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
  // using SourceMapDevToolPlugin instead of devtool (related)
  devtool: 'source-map',
  // devtool: false,
  plugins: [
    // HtmlWebpackPlugin inserts the bundled scripts into the file specfied by
    // filename, using the specified template.
    // This is used for the client.  The handlebars loader (below) and the template
    // extension will trigger the use of handlebars over the default ejs.
    // Express rendering takes care of the server side templating, and will take the
    // resulting template from this plugin and embed it in the layout.
    new HtmlWebpackPlugin({
      // template to use
      template: path.join(HBS_VIEWS_DIR, 'viewAppClient.hbs'),
      //inject: false, // true or 'body', or 'head' or false
      // output file name -- used by express and inserted into a layout
      filename: path.join(HBS_SHARED_VIEWS_DIR, '/viewAppClientWp.hbs'), // wp = webpack
      showErrors: true
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
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
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          // babel.config.json will be used by default
          // if false, put the babelrc stuff here
          // if true, put this stuff in .babelrc
          // babelrc: true,
          // presets: ["@babel/preset-env", "@babel/preset-react"],
          //plugins: ['syntax-dynamic-import'] // needed for lazy loading
        }
      },
      // The handlebars-loader will compile Handlebars templates into
      // a function, which will be imported into the javascript when you
      // import a Handlebars file.
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [HBS_HELPERS_DIR],
          partialDirs: [HBS_PARTIALS_DIR, HBS_SHARED_VIEWS_DIR],
          debug: false
        }
      },
      // For sass/scss
      //    First convert SCSS to CSS with sass-loader
      //    Then use css-loader to process @import() and @url(), etc
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
      //
      //    Include the src/styles and src/styles/modules,
      //    and also the files in the individual components src/client/components.
      //    Assume the component folder are modules
      {
        test: /\.css$/,
        include: [STYLE_MODULES_DIR, COMPONENTS_DIR],
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          }
        ]
      },
      // This rule is like the one above, eccpet do not process the CSS modules.
      // In other words, don't change the class names and selectors to be scoped
      // locally. This is what the modules option does above.
      {
        test: /\.css$/,
        include: STYLES_DIR,
        exclude: STYLE_MODULES_DIR,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        include: [STYLE_MODULES_DIR, COMPONENTS_DIR],
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
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
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: IMG_DIR,
        use: 'file-loader'
      },

      // allow fonts to be central in the fonts directory, or stored with
      // a component.
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: [FONTS_DIR, COMPONENTS_DIR],
        // include: FONTS_DIR,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  },
  // simplify imports into js
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  devServer: {
    // usually dev server publicPath is the same as output.publicPath
    publicPath: '/', // where bundles are served from. Start and end with a /
    contentBase: ASSETS_DIR, // only necessary to serve static files (not webpack). Can be an array of paths [path1, path2, ...]
    watchContentBase: true,
    // set up proxy so browser reqeusts are forwarded to be handled by express
    index: '', // specify to a falsy string enable root proxying
    proxy: {
      // context: ['/auth', '/api'] // for selective proxying for example
      context: () => true, // forward everyting
      target: 'http://localhost:8080/'
    },
    compress: true, // files being sent to browser
    port: 9000, // default is 8080
    overlay: { warnings: true, errors: true }, // overlay in browser when there are errors/warnings
    disableHostCheck: false, // default is true, but false is more secure
    open: false // true: open tab in browser
    // Could not get hot reloading to work with React. SSR may have also been a
    // complicating factor.  Try React Fast Refresh in the future.
    // hot: true // hot reload of modules. Needs webpack.HotModuleReplacmentPlugin() above
  }
};

module.exports = config;
