require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');

// Need this for OMDB requests //
var request = require("request");

//var spotify = new Spotify(keys.spotify);

var action = process.argv[2]

switch(action) {
  case 'my-tweets':
    //Show last 20 tweets
    var client = new Twitter(keys.twitter)
    console.log(client)
    // need to use count param - limit to 20.
    // need to use q param (use @becca_kostyo - will look something like this: q=from%3ACmdr_Hadfield%20%23nasa&result_type=popular)
    break;
  case 'spotify-this-song':
    // Display this info about the song (argv[3] in terminal window:
      // Artist
      // Name
      // Preview link
      // Album
    // if statement - if argv[3] is null, default to "The Sign" by Ace of Base
    break;
  case 'movie-this':
    if (process.argv[3] != null) {
      request("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var movie = JSON.parse(body);
          console.log("Title: " + movie.Title + 
                      "\nRelease Year: " + movie.Year + 
                      "\nIMDB Rating: " + movie.imdbRating + 
                      "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value + 
                      "\nProduced In: " + movie.Country + 
                      "\nLanguage: " + movie.Language + 
                      "\nPlot: " + movie.Plot +
                      "\nActors: " + movie.Actors)
        }
      })
    } else {
      request("http://www.omdbapi.com/?t=Mr.%20Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var movie = JSON.parse(body);
          console.log("Title: " + movie.Title + 
                      "\nRelease Year: " + movie.Year + 
                      "\nIMDB Rating: " + movie.imdbRating + 
                      "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value + 
                      "\nProduced In: " + movie.Country + 
                      "\nLanguage: " + movie.Language + 
                      "\nPlot: " + movie.Plot +
                      "\nActors: " + movie.Actors)
        }
      })
    }
    break;
}