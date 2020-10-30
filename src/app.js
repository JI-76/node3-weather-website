
// app.js
// Node.js server Express App

// added utils file
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

// load npm Package
const path = require('path');
const express = require('express');
const hbs = require('hbs');
//const postmanRequest = require('postman-request');

// create Express app
const app = express();

// add a value from that Heroku will supply in an OS-level Environment variable
// with a default value of 3000 if the Environment value is not supplied
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
// customize the location and name of the subdirectory used by the Handlerbars templating engine (hbs) views
const viewsPath = path.join(__dirname, '../templates/views');
// customize the location and name of the subdirectory used by the Handlerbars templating engine (hbs) partials
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
// set the value for an Express setting "view engine"
app.set('view engine', 'hbs');
// set the value for an Express setting "views" to use the new custom path to the Handlerbars templating engine (hbs) views
app.set('views', viewsPath);
// set hbs location for partials
hbs.registerPartials(partialsPath);

// Setup directory to serve up static files
// serve up subdirectory ./public
// this serves up static index.html automatically for the root route
app.use(express.static(publicDirectoryPath));

// add route for view index.hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John Ison'
    });
});

// add route for view about.hbs
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'John Ison'
    });
});

// add route for view help.hbs
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'John Ison',
        message: 'This is the Help page'
    });
});

// add route for view ?
app.get('/weather', (req, res) => {

    // guard condition to make a address parameter required
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    };

    // Chained Callback Pattern - it is convention to call the callback function with 2 arguments - error and data.
    // geocode(userLocation, (error, {longitude, latitude, location} = {}) => {
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            //return console.log('Error:', error);
            return res.send({ error: error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                //return console.log('Error:', error);
                return res.send({error: error});
            }
          
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            });
            });
    });
});

// Query String ex. localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
    // guard condition to make a parameter (search) required
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    };
    //console.log(req.query);
    console.log(req.query.search);
    res.send({
        products: []
    });
});

// route handler for help 404 errors
app.get('/help/*', (req, res) => {
    //res.send('Help article not found.');
    res.render('error404', {
        title: 'Error 404 Help',
        errorMessage: 'Help article not found.',
        name: 'John Ison'
    });
});

// This should be the last route handler to preclude valid routes from being omitted.
// add route for generic 404 Errors (* indicates everything else)
app.get('*', (req, res) => {
    //res.send('Error 404 - webpage not found!');
    res.render('error404', {
        title: 'Error 404',
        errorMessage: 'Error 404: Page not found.',
        name: 'John Ison'
    });
});


// start express server to listen on "Dev" port
// app.listen(3000, () => {
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});