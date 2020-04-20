const dotenv = require('dotenv').config();
var moment = require('moment');
moment().format();

var keys = require("./keys.js");

const axios = require('axios');
/* Axios example 
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
*/

//spotify example
//var spotify = new Spotify(keys.spotify);



//vars for user input
var cmdArgs = process.argv;
var liriCmd = process.argv[2];
var liriArg = '';

//determining th Arg
for(var i=3; i<cmdArgs.length; i++){
	liriArg += cmdArgs[i] + '';
}

// Determine which LIRI command is being requested

//tweets
if (liriCmd === 'my-tweets') {
	retrieveTweets(); 

  //spotify songs
} else if (liriCmd === `spotify-this-song`) {
	spotifySong(liriArg);

  //movies  
} else if (liriCmd === `movie-this`) {
	retrieveOBDBInfo(liriArg);

  //simeon says
} else if (liriCmd ===  `do-what-it-says`) {
  doAsTheySay();
  
}