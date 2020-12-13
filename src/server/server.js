// File: server.json
// This file is used in conjuction with serverRender.js for server side rendering:
// Express server is set up.
// Using npm for sass instead of webpack and sassMiddleware
// Handlebars is used as a template engine.
// server.get(path, callback) calls are made, and in general, the specified callback
// function is in the serverRender.js file.  The callback calls an Axios promise,
// and the resulting promise is returned to the server.get call in this file.  The
// view is then rendered using handlebars template engine.
// The api rounter in ./api/index.js is used.
// Static pages are set to be served from the dist path: server.use(express.static('dist'));
//

import path from 'path';
// import { inspect } from 'util'; // console.log of objects
// using npm for sass instead of webpack
// import sassMiddleware from 'node-sass-middleware';
// express
import express from 'express';

// express-handlebars template engine
import hbs from 'express-handlebars';

// BPS stuff
// modules (type: module in package.json) need extension
import config from '../../config';
import apiRouter from './api/index.js'; // import the api router
import * as serverRender from './serverRender.js';

// set paths
// Note: __dirname will be the webpack output path.
// If webpack is used for separate backend build,
// webpack config will need node: { __dirname: false } otherwise
// __dirname will be '/'
const BUNDLE_DIR = path.resolve(__dirname, '../dist/bundles');
const ASSETS_DIR = path.resolve(__dirname, '../src/static');
const HBS_VIEWS_DIR = path.resolve(__dirname, '../src/views');
const HBS_LAYOUTS_DIR = path.join(HBS_VIEWS_DIR, 'layouts/');
const HBS_PARTIALS_DIR = path.join(HBS_VIEWS_DIR, 'partials/');
const HBS_SHARED_PARTIALS_DIR = path.join(HBS_VIEWS_DIR, 'shared/'); // shared w/client
//
// body parser
// import bodyParser from 'body-parser';
const server = express();

//import App from '../../frontend/src/components/App';

// body-parser at app top level to parse all incoming requests
// server.use(bodyParser.json());
// OR
// create application parser, but then use it on the routes that need it.
// Put the following lines in api/index.js and then use jsonParser in a POST
// import bodyParser from 'body-parser';
// const jsonParser = bodyParser.json();

// Set up the handlebars template engine and specify the extension,
// default layout, layout and partials dirs, and you can add helpers here too.
// Note the use of a second partial directory for partials to be shared
// with the front end.
server.engine(
  'hbs',
  hbs({
    extname: '.hbs', // file extension. default is handlebars
    defaultLayout: 'layoutDefault', // default is main
    layoutsDir: HBS_LAYOUTS_DIR,
    partialsDir: [HBS_PARTIALS_DIR, HBS_SHARED_PARTIALS_DIR],
    helpers: {
      toJSON: function (object) {
        return JSON.stringify(object);
      }
    }
  })
);
// Set the view folder to use.  Express will default to using the
// 'views' directory in the application root directory.
// Note that by default, the partials and layouts folder are
// relateive to the view folder, these may need to be adjusted below.
// Note, that when changing the extension above, the server.engine
// line above needs to go above the two lines below.
server.set('view engine', 'hbs');
server.set('views', HBS_VIEWS_DIR);

// Set up routing to static pages.
// about route
// You can do this, and manually plumb the response...
/*
server.get('/about.html', (req, res) => {
  fs.readFile('./about.html', (err, data) => {
    res.send(data.toString());
  });
});
*/

// or even simpler ...
//
// For static pages, you can use express.static middleware do this
// by specifying the path and putting static pages in that directory
// Use the extensions option to specify extensions so they can be
// left off the url -- Note: Do not include the period.
//
// Tell express where to get the bundled assets from
server.use(express.static(BUNDLE_DIR));
// Tell it where to get other static pages from.
server.use(express.static(ASSETS_DIR, { extensions: ['html', 'htm'] }));

server.get(['/', '/home'], (req, res) => {
  serverRender
    .baseDataRender() // promise from serverRender axios get call
    .then(({ initialMarkup, initialData }) => {
      // Render a view (output from WP that includes bundled scripts,
      // passing local variables to the view.
      // Path is expected to be relative to views directory.
      res.render('./shared/viewAppClientWp.hbs', {
        title: 'BPS Arpio',
        // layout: path.join(HBS_LAYOUTS_DIR, 'arpioLayout'),
        layout: 'layoutHome',
        initialMarkup,
        initialData
      });
    })
    .catch((error) => {
      res.status(404).send(`Bad Request WTF server.js: ${error}`);
      //res.send(error);
    });
});

//server.get(['/events', '/events/:eventId'], (req, res) => {
//// console.log(`eventId in server.js: ${req.params.eventId}`);
//serverRender
//.eventListRender(req.params.eventId) // promise from serverRender axios get call
//.then(({ initialMarkup, initialData }) => {
////console.log('after serverRender');
////console.log(
////  inspect(initialData, { showHidden: false, depth: null, colors: true })
////);
//// Render a view, passing local variables to the view
//res.render('index', {
//title: 'BPS Arpio',
//layout: 'arpioLayout',
//initialMarkup,
//initialData
//});
//})
//.catch((error) => {
//console.error(error);
//res.status(404).send('Bad Request server.js');
////res.send(error);
//});
//});

// first arg is the route, second is the apiRouter we imported above
server.use('/api', apiRouter); // use the api router we made (api/index.js)

server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.port);
});
