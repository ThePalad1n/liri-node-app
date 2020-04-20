const dotenv = require('dotenv').config();
var moment = require('moment');
moment().format();

var keys = require("./keys.js");

const axios = require('axios');
 
// Make a request for a user with a given ID
axios.get('/user?ID=ThePalad1n')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
 
// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: ThePalad1n
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  
 
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=ThePalad1n');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}





var spotify = new Spotify(keys.spotify);