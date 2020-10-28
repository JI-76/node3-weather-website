// app.js
// Client side javascript to run by the browser and locatd in .\public\js

console.log('Client-side javascript file is loaded!');

// using Fetch API from a browser-based API

// Prototype using dummy JSON HTTP endpoint API at http://puzzle.mead.io/puzzle
// This API serves up JSON response object with a single property:
// {
//     "puzzle": "Vending Machine"
// }
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

// create attachment to HTML Form element <form>
const weatherForm = document.querySelector('form');
// create attachment to HTML Input element <input>
const searchInput = document.querySelector('input');

// multiple HTML Paragraph elements <p> require use of an unique id for each
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// Event Listener for HTML Form element <form>
weatherForm.addEventListener('submit', (e) => {
    // negate full webpage refresh
    e.preventDefault();

    // grab user input
    const location = searchInput.value;

    // Goal: Render content to the Paragraph elements <p>
    // 1. Select the second message (Paragraph element <p> id="message-2" in JavaScript
    // 2. Just before Fetch, render loading message (Paragraph element <p> id="message-1" and empty (Paragraph element <p> id="message-2"
    // 3. If error, render error
    // 4. If no error, render location and forecast
    // 5. Test using valid and invalid locations
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                // console.log(data.location);
                messageOne.textContent = data.location;
                // console.log(data.forecast);
                messageTwo.textContent = data.forecast;
            };
        });
    });
});
