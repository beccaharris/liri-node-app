require('dotenv').config();
var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var request = require('request');

var action = process.argv[2];
var command3 = process.argv[3];
var textFile = ('./log.txt');

function runCommand() {
  switch (action) {
    case 'my-tweets':
      grabTweets();
      break;
    case 'spotify-this-song':
      grabSong();
      break;
    case 'movie-this':
      grabMovie();
      break;
    case 'do-what-it-says':
      grabRandom();
      break;
  }
}
// Grabs last 20 tweets from user @becca_kostyo and displays the tweet #, created_at, and tweet text in console. //
// -----------------------------------------------//
function grabTweets() {
  var client = new Twitter(keys.twitter);
  var params = { q: '@becca_kostyo', count: 20 };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var createdAtUnix = moment(new Date(tweets[i].created_at));
        var createdAtPretty = moment(createdAtUnix).format('MM/DD/YYYY @ hh:mma');
        var tweetText = "\nTweet: " + (parseInt([i]) + 1) + " of " + tweets.length + "\nTweeted on " + createdAtPretty + "\nText: " + tweets[i].text + "\n---------------------";
        console.log(tweetText);
        fs.appendFile(textFile, tweetText)
      }
    }
  })
};
// Grabs 1 song based on user params and returns song info. No song specified, looks up 'The Sign by' Ace of Base //
// -----------------------------------------------//
function grabSong() {
  var spotify = new Spotify(keys.spotify);
  if (command3 != null) {
    spotify.search({ type: 'track', query: command3, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } else {
        for (var i = 0; i < data.tracks.items.length; i++) {
          var musicText = "\nArtist: " + data.tracks.items[i].artists[i].name + "\nSong Name: " + data.tracks.items[i].name + "\nPreview Link: " + data.tracks.items[i].preview_url + "\nAlbum: " + data.tracks.items[i].album.name + "\n------------------";
          console.log(musicText);
          fs.appendFile(textFile, musicText, function(err) {
            if (err) {
              console.log(err)
            }
          });
        }
      }
    })
  } else {
    spotify.search({ type: 'track', query: 'Ace of Base Sign', limit: 1}).then(function(data) {
      var musicText = "\nAce of Base...AGAIN:\nArtist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name + "\n------------------";
      console.log(musicText);
      fs.appendFile(textFile, musicText, function(err) {
        if (err) {
          console.log(err)
        }
      })
    }) 
  }
};
// Grabs movie from OMDB and shows some info in the console //
// -----------------------------------------------//
function grabMovie() {
  if (command3 != null) {
    request("http://www.omdbapi.com/?t=" + command3 + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var movie = JSON.parse(body);
        console.log("Title: " + movie.Title + "\nRelease Year: " + movie.Year + "\nIMDB Rating: " + movie.imdbRating + "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value + "\nProduced In: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nActors: " + movie.Actors)
        fs.appendFile(textFile, "Title: " + movie.Title + "\nRelease Year: " + movie.Year + "\nIMDB Rating: " + movie.imdbRating + "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value + "\nProduced In: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nActors: " + movie.Actors)
      }
    })
  } else {
    request("http://www.omdbapi.com/?t=Mr.%20Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var movie = JSON.parse(body);
        console.log("Title: " + movie.Title + "\nRelease Year: " + movie.Year + "\nIMDB Rating: " + movie.imdbRating + "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value + "\nProduced In: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nActors: " + movie.Actors)
        fs.appendFile(textFile, "Title: " + movie.Title + "\nRelease Year: " + movie.Year + "\nIMDB Rating: " + movie.imdbRating + "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value + "\nProduced In: " + movie.Country + "\nLanguage: " + movie.Language + "\nPlot: " + movie.Plot + "\nActors: " + movie.Actors)
      }
    })
  }
};
// Reads the text from random.txt, puts it in an array, and then runs the command for the song //
// -----------------------------------------------//
function grabRandom() {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) {
      return console.log(error)
    }
    var dataArr = data.split(',')
    action = dataArr[0];
    command3 = dataArr[1]
    grabSong();
  })
}
// Call for switch statement function // 
runCommand();
