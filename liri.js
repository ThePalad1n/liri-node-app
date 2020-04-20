const dotenv = require('dotenv').config();
var moment = require('moment');
moment().format();
var request = require('request')
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
for (var i = 3; i < cmdArgs.length; i++) {
  liriArg += cmdArgs[i] + '';
}





function retEventInfo(artist) {

  // If no movie is provided, LIRI defaults to 'blink182'
  var search;
  if (artist === '') {
    search = 'blink182';
  } else {
    search = artist;
  }

  var eventSearch = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  request(eventSearch, function (error, response, body) {
    
    if (error || (response.statusCode !== 200)) {
      var error1 = 'ERROR: Retrieving bands_in_town entry -- ' + error;
      console.log(error1)
      return;

    }

    else {
      var data = JSON.parse(body);

      if (!data.venue && !data.location && !data.datetime) {
        var error2 = 'ERROR: No event info found';
        console.log(error2)
        return;
      } 

      else {

        var outputEvent = '------------------------\n' +
          'Event Information:\n' +
          '------------------------\n\n' +
          'Name of Venue: ' + data.venue + '\n' +
          'Location: ' + data.location + '\n' +
          'Date & Time: ' + data.datetime + '\n' +
          '------------------------' + '\n'
        console.log(outputEvent);
      }
    }
  });

}

// Determine which LIRI command is being requested

//artist events
if (liriCmd === `concert-this`) {
  retEventInfo(liriArg);

  //spotify songs
} else if (liriCmd === `spotify-this-song`) {
  spotifySong(liriArg);

  //movies  
} else if (liriCmd === `movie-this`) {
  retrieveOBDBInfo(liriArg);

  //simeon says
} else if (liriCmd === `do-what-it-says`) {
  doAsTheySay();

}