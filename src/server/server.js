// File: server.json
// This file is used in conjuction with serverRender.js for server side rendering:
// Express server is set up.
// sassMiddleware is used, and handlebars is used as a template engine.
// server.get(path, callback) calls are made, and in general, the specified callback
// function is in the serverRender.js file.  The callback calls an Axios promise,
// and the resulting promise is returned to the server.get call in this file.  The
// view is then rendered using handlebars template engine.
// The api rounter in ./api/index.js is used.
// Static pages are set to be served from the dist path: server.use(express.static('dist'));
//

const path = require('path');
// import { inspect } from 'util'; // console.log of objects
// using npm for sass instead of webpack
const sassMiddleware = require('node-sass-middleware');
// express
const express = require('express');
// handlbars tempalte engine
const hbs = require('express-handlebars');

// BPS stuff
// modules (type: module in package.json) need extension
const config = require('../config.js');
const apiRouter = require('./api/index.js'); // import the api router (./api/index.js)
const serverRender = require('./serverRender.js');

// set paths
// sassMiddleware takes in sass in src dir and spit out css in dist dir
const SASS_DIR = path.resolve(__dirname, 'src/sass');
const CSS_DIR = path.resolve(__dirname, 'dist/css');
const HBS_VIEWS_DIR = path.resolve(__dirname, '..', '/frontend/views');
const HBS_VIEWS_SHARED_DIR = path.resolve(HBS_VIEWS_DIR, 'shared');
const HBS_LAYOUTS_DIR = path.resolve(HBS_VIEWS_DIR, 'layouts');
const HBS_PARTIALS_DIR = path.resolve(HBS_VIEWS_DIR, 'partials');
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

// Use sass middleware with express
// Note: Must go before express.static or it (sass?) won't work.
// sass will take in /sass/style.scss (src file, extension is short for 'sass css file') and create /css/style.css
server.use(
  sassMiddleware({
    src: SASS_DIR,
    dest: CSS_DIR,
    prefix: '/css', // needed if src and dest are not the same path
    debug: false
  })
);

// Set up template engine to
// server render javascript fronend components.
// By default express will look for templates
// in a views folder.

// express-handlebars assumes the /views folder. Take this
// a step further by specifying subfolders for partials and layouts.
// Other pages can go directly into views.
// Note the use of a second partial directory for partials to be shared
// with the front end.
server.engine(
  'hbs',
  hbs({
    extname: 'hbs', // file extension. default is handlebars
    defaultLayout: 'default', // default is main
    layoutsdDir: HBS_LAYOUTS_DIR,
    partialsDir: [HBS_PARTIALS_DIR, HBS_VIEWS_SHARED_DIR],
    helpers: {
      toJSON: function (object) {
        return JSON.stringify(object);
      }
    }
  })
);

// Handlebars view engine setup
server.set('view engine', 'hbs');

server.get('/', (req, res) => {
  //console.log('params in server.js');
  //console.log(
  //  inspect(req.params, { showHidden: false, depth: null, colors: true })
  //);
  serverRender
    .baseDataRender() // promise from serverRender axios get call
    .then(({ initialMarkup, initialData }) => {
      //console.log('after serverRender');
      //console.log(
      //  inspect(res, { showHidden: false, depth: null, colors: true })
      //);
      // Render a view, passing local variables to the view
      res.render('index', {
        title: 'BPS Arpio',
        layout: 'arpioLayout',
        initialMarkup,
        initialData
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send('Bad Request server.js');
      //res.send(error);
    });
});

server.get(['/events', '/events/:eventId'], (req, res) => {
  // console.log(`eventId in server.js: ${req.params.eventId}`);
  serverRender
    .eventListRender(req.params.eventId) // promise from serverRender axios get call
    .then(({ initialMarkup, initialData }) => {
      //console.log('after serverRender');
      //console.log(
      //  inspect(initialData, { showHidden: false, depth: null, colors: true })
      //);
      // Render a view, passing local variables to the view
      res.render('index', {
        title: 'BPS Arpio',
        layout: 'arpioLayout',
        initialMarkup,
        initialData
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send('Bad Request server.js');
      //res.send(error);
    });
});

// about route
// You can do this, and manually plumb the response...
/*
server.get('/about.html', (req, res) => {
  fs.readFile('./about.html', (err, data) => {
    res.send(data.toString());
  });
});
*/

// or even simpler, for static pages, you can do this
// by specifying the path 'dist' in this case
// and moving the about.html file to that directory
server.use(express.static('dist'));

// first arg is the route, second is the apiRouter we imported above
server.use('/api', apiRouter); // use the api router we made (api/index.js)

server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.port);
});
