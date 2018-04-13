
require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");

var Twitter = require('twitter')
var Spotify = require('node-spotify-api')
var moment = require('moment')

// Need this for OMDB requests //
var request = require("request");


var action = process.argv[2]

switch (action) {
  case 'my-tweets':
    //Show last 20 tweets
    var client = new Twitter(keys.twitter);
    var params = { q: '@becca_kostyo', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (!error) {
        for (var i = 0; i < tweets.length; i++) {
          var createdUnix = moment(new Date(tweets[i].created_at));
          var createdAtPretty = moment(createdUnix).format("MM/DD/YYYY @ hh:mma")
          console.log(
            "Tweet: " + (parseInt([i]) + 1) + " of " + tweets.length +
            "\nTweeted on " + createdAtPretty +
            "\nText: " + tweets[i].text +
            "\n---------------------")
        }
      }
    })
    break;
  case 'spotify-this-song':
    var spotify = new Spotify(keys.spotify);
    if (process.argv[3] != null) {
      spotify.search({ type: 'track', query: process.argv[3], limit: 2 }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } 
        for (var i = 0; i < data.tracks.items.length; i++) {
          console.log(
            "Artist: " + data.tracks.items[i].artists[i].name + 
            "\nSong Name: " + data.tracks.items[i].name + 
            "\nPreview Link: " + data.tracks.items[i].preview_url + 
            "\nAlbum: " + data.tracks.items[i].album.name +
            "\n------------------"
          )

        }
      })
    } else {
      console.log("blank :(")
    }
    break;
  case 'movie-this':
    if (process.argv[3] != null) {
      request("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
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
      request("http://www.omdbapi.com/?t=Mr.%20Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
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