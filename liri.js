const dotenv = require('dotenv').config();
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var keys = require("./keys.js");
const axios = require('axios');
const fs = require('fs');


var cmdArgs = process.argv;
var liriCmd = process.argv[2];
var liriArg = '';

for (var i = 3; i < cmdArgs.length; i++) {
  liriArg += cmdArgs[i] + '';
}

var spotify = new Spotify(keys.spotify);
function spotifySong(song) {
  var search;
  if (song === '') {
    search = 'The Sign Of Ace';
  } else {
    search = song;
  }

  spotify.search({ type: 'track', query: search })
  .then(function(response) {


    for (var i = 0; i < 19; i++) {
      var outputEvent = '------------------------\n' +
        'Song Information:\n' +
        '------------------------\n\n' +
        'Name of Artist: ' + response.tracks.items[i].artists[0].name + '\n' +
        'Name of Song: ' + response.tracks.items[i].name + '\n' +
        'URL of Song: ' + response.tracks.items[i].href + '\n' +
        'Name of Album: ' + response.tracks.items[i].name + '\n' +
        '------------------------' + '\n'
      console.log(outputEvent);
    }
  })
  .catch(function(err) {
    console.log(err);
  });

}


function retEventInfo(artist) {
  var search;
  if (artist === '') {
    search = 'blink182';
  } else {
    search = artist;
  }
  var eventSearch = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(eventSearch)
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        var outputEvent = '------------------------\n' +
          'Event Information:\n' +
          '------------------------\n\n' +
          'Name of Venue: ' + response.data[i].venue.name + '\n' +
          'Location: ' + response.data[i].venue.location + '\n' +
          'Date & Time: ' + response.data[i].datetime + '\n' +
          '------------------------' + '\n'
        console.log(outputEvent);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
}




function retOBDBInfo(movie) {
  var search;
  if (movie === '') {
    search = 'matrix';
  } else {
    search = movie;
  }

  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      var outputEvent = '------------------------\n' +
        'Movie Information:\n' + 
        'Title of the movie: ' + response.data.Title + '\n' +
        'Year the movie came out: ' + response.data.Year + '\n' +
        'IMDB Rating of the movie: ' + response.data.imdbRating + '\n' +
        'Rotten Tomatoes Rating of the movie: ' + response.data.Ratings + '\n' +
        'Country where the movie was produced: ' + response.data.Country + '\n' +
        'Language of the movie: ' + response.data.Language + '\n' +
        'Plot of the movie: ' + response.data.Plot + '\n' +
        'Actors in the movie: ' + response.data.Actors + '\n' 

        console.log(outputEvent);
    })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
      
        console.log(error.request);
      } else {
      
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}



function doAsTheySay() {
	fs.readFile('./random.txt', 'utf8', function (error, data) {
		if (error) {
			console.log('ERROR: Reading random.txt -- ' + error);
			return;
		} else {
			// Split out the command name and the parameter name
			var cmdString = data.split(',');
			var cmd = cmdString[0].trim();
			var par = cmdString[1].trim();

			switch(cmd) {
				case 'concert-this':
					retEventInfo(); 
					break;

				case 'spotify-this-song':
					spotifySong(par);
					break;

				case 'movie-this':
					retOBDBInfo(par);
					break;
			}
		}
	});
}




if (liriCmd === `concert-this`) {
  retEventInfo(liriArg);

  //spotify songs
} else if (liriCmd === `spotify-this-song`) {
  spotifySong(liriArg);

  //movies  
} else if (liriCmd === `movie-this`) {
  retOBDBInfo(liriArg);

  //simeon says
} else if (liriCmd === `do-what-it-says`) {
  doAsTheySay();

}