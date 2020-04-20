const dotenv = require('dotenv').config();
var moment = require('moment');
moment().format();
var keys = require("./keys.js");

const axios = require('axios');




//vars for user input

var cmdArgs = process.argv;
var liriCmd = process.argv[2];
var liriArg = '';

//determining th Arg
for (var i = 3; i < cmdArgs.length; i++) {
  liriArg += cmdArgs[i] + '';
}


var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: '1d59844cc57840288131ecdf8d4bb81f',
  secret: 'ee6e163fb617422ca234cad359914bde'
});

function spotifySong(song) {

  var search;
  if (song === '') {
    search = 'The Sign Of Ace';
  } else {
    search = song;
  }

  spotify.search({ type: 'track', query: search }, function (error, data) {
    if (error) {
      var error1 = 'ERROR: Retrieving Spotify track -- ' + error;
      console.log(error1);
      return;
    }
    else {
      var songInfo = data.tracks.items[0];
      if (!songinfo) {
        var error2 = 'ERROR: No song info retrieved';
        console.log(error2);
        return;
      }
      else {
        var outputStr = '--------------\n' +
          'Song Information:\n' +
          '---------------------\n\n' +
          'Song Name: ' + songInfo.name + '\n' +
          'Artist: ' + songInfo.artist[0].name + '\n' +
          'Album: ' + songInfo.album.name + '\n' +
          'Preview Here: ' + songInfo.preview_url + '\n';
        console.log(outputStr)
      }
    }
  });
}

/*
function spotifySong(song) {
  var search;
  if (song === '') {
    search = 'ADHD';
  } else {
    search = song;
  }

  spotify.search({ type: 'track', query: search }, function (error, data) {
    if (error) {
      var error1 = 'ERROR: Retrieving Spotify track -- ' + error;
      console.log(error1);
      return;
    }
    else {
      var songInfo = data.tracks.items[0];
      if (!songinfo) {
        var errorStr2 = 'ERROR: No song info retrieved';
        console.log(errorStr2);
        return;
      }
      else {
        var outputSong = '--------------\n' +
          'Song Information:\n' +
          '---------------------\n\n' +
          'Song Name: ' + songInfo.name + '\n' +
          'Artist: ' + songInfo.artist[0].name + '\n' +
          'Album: ' + songInfo.album.name + '\n' +
          'Preview Here: ' + songInfo.preview_url + '\n';
        console.log(outputSong)
      }
    }
  });
}
*/




function retEventInfo(artist) {

  // If no movie is provided, LIRI defaults to 'blink182'
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
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
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
