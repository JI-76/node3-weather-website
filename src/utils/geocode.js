// geocode.js

// load npm Package
const postmanRequest = require('postman-request');

// Implementing object destructuring and property shorthand
// const geocode = (address, callback) => {
const {longitude, latitude, location} = geocode= (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamktNzYiLCJhIjoiY2tmaXFkY3huMDdmZTJycjl4OGNtbHQ2ZCJ9.yAdFD46WGhalgZWHq22AEA';

    //console.log(url);
    // postmanRequest({url, json: true}, (error, response) => {
    postmanRequest({url, json: true}, (error, {body}) => {
        // check for low-level errors
        if (error) {
            callback('Error: Unable to connect to location services!', undefined);
        // check for if any locations are returned in the reponse
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[1].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamktNzYiLCJhIjoiY2tmaXFkY3huMDdmZTJycjl4OGNtbHQ2ZCJ9.yAdFD46WGhalgZWHq22AEA';

//     //console.log(url);
//     // postmanRequest({url: url, json: true}, (error, response) => {
//     postmanRequest({url, json: true}, (error, response) => {
//         // check for low-level errors
//         if (error) {
//             callback('Error: Unable to connect to location services!', undefined);
//         // check for if any locations are returned in the reponse
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined);
//         } else {
//             callback(undefined, {
//                 longitude: response.body.features[1].center[0],
//                 latitude: response.body.features[0].center[1],
//                 location: response.body.features[0].place_name
//             });
//         }
//     });
// };

// export
module.exports = geocode;