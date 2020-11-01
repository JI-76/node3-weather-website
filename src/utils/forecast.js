// forecast.js

// load npm Package
const postmanRequest = require('postman-request');

// Implementing object destructuring and property shorthand
// const forecast = (latitude, longitude, callback) => {
const {weatherDescription, currentTemp, feelsLike, currentPrecip} = forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ff82dad6838af5c9dde90bd294d59944&query=' + latitude + ',' + longitude + '&units=f';

    // console.log(url);
    // postmanRequest({url: url, json: true}, (error, response) => {
    postmanRequest({url, json: true}, (error, {body}) => {
        // check for low-level errors
        if (error) {
            callback('Error: Unable to connect to weather services!', undefined);
        // check for if any locations are returned in the reponse
        } else if (body.error) {
            callback('Unable to find location coordinates', undefined);
        } else {
            // callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + 'F degrees out. It feels like ' + response.body.current.feelslike + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain.');
            callback(undefined, 'Forecast: ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 'F degrees out and the humidity is at ' + body.current.humidity +'%. It feels like ' + body.current.feelslike + ' degrees out. The current UV Index is ' + body.current.uv_index + '. The barometric pressure is ' + body.current.pressure + ' millibars. There is a ' + body.current.precip + '% chance of rain.');
            // callback(undefined, {
            //     weatherDescription: body.current.weather_descriptions[0],
            //     currentTemp: body.current.temperature,
            //     feelsLike: body.current.feelslike,
            //     currentPrecip: body.current.precip});
        }
    });
};

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=ff82dad6838af5c9dde90bd294d59944&query=' + latitude + ',' + longitude + '&units=f';

//     // console.log(url);
//     // postmanRequest({url: url, json: true}, (error, response) => {
//     postmanRequest({url, json: true}, (error, response) => {
//         // check for low-level errors
//         if (error) {
//             callback('Error: Unable to connect to weather services!', undefined);
//         // check for if any locations are returned in the reponse
//         } else if (response.body.error) {
//             callback('Unable to find location coordinates', undefined);
//         } else {
//             callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + 'F degrees out. It feels like ' + response.body.current.feelslike + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain.');
//         }
//     });
// };

// export
module.exports = forecast;