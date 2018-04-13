require('dotenv').config();
const fs = require('fs');
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const moment = require('moment');
const request = require('request');
const textFile = ('./log.txt');
var action = process.argv[2];
var command3 = process.argv[3];

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
      for (let i = 0; i < tweets.length; i++) {
        var createdAtUnix = moment(new Date(tweets[i].created_at));
        var createdAtPretty = moment(createdAtUnix).format('MM/DD/YYYY @ hh:mma');
        var tweetText = `Tweet: ${(parseInt([i]) + 1)} of ${tweets.length} \nTweeted on ${createdAtPretty} \nText: ${tweets[i].text} \n---------------------\n`;
        console.log(tweetText);
        fs.appendFile(textFile, tweetText, function (err) {
          if (err) {
            console.log(err)
          }
        })
      }
    }
  })
};
// Grabs 2 songs based on user params and returns song info. No song specified, looks up 'The Sign by' Ace of Base //
// -----------------------------------------------//
function grabSong() {
  var spotify = new Spotify(keys.spotify);
  if (command3 != null) {
    spotify.search({ type: 'track', query: command3, limit: 2 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } else {
        for (let i = 0; i < data.tracks.items.length; i++) {
          var musicText = `Artist: ${data.tracks.items[i].artists[i].name} \nSong Name: ${data.tracks.items[i].name} \nPreview Link: ${data.tracks.items[i].preview_url} \nAlbum: ${data.tracks.items[i].album.name} \n------------------\n`;
          console.log(musicText);
          fs.appendFile(textFile, musicText, function (err) {
            if (err) {
              console.log(err)
            }
          });
        }
      }
    })
  } else {
    spotify.search({ type: 'track', query: 'Ace of Base Sign', limit: 1 }).then(function (data) {
      var musicText = `Artist: ${data.tracks.items[0].artists[0].name} \nSong Name: ${data.tracks.items[0].name} \nPreview Link: ${data.tracks.items[0].preview_url} \nAlbum: ${data.tracks.items[0].album.name} \n------------------\n`;
      console.log(musicText);
      fs.appendFile(textFile, musicText, function (err) {
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
    request(`http://www.omdbapi.com/?t=${command3}&y=&plot=short&apikey=trilogy`, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var movie = JSON.parse(body);
        var movieText = `Title: ${movie.Title} \nRelease Year: ${movie.Year} \nIMDB Rating: ${movie.imdbRating} \nRotten Tomatoes Rating: ${movie.Ratings[1].Value} \nProduced In: ${movie.Country} \nLanguage: ${movie.Language} \nPlot: ${movie.Plot} \nActors: ${movie.Actors} \n------------------\n`;
        console.log(movieText)
        fs.appendFile(textFile, movieText, function (err) {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  } else {
    request("http://www.omdbapi.com/?t=Mr.%20Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var movie = JSON.parse(body);
        var movieText = "Mr. Nobody...AGAIN (enter in a movie name to get something different):\nTitle: " + movie.Title +
          "\nRelease Year: " + movie.Year + "\nIMDB Rating: " + movie.imdbRating +
          "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value +
          "\nProduced In: " + movie.Country +
          "\nLanguage: " + movie.Language +
          "\nPlot: " + movie.Plot +
          "\nActors: " + movie.Actors +
          "\n------------------\n";
        console.log(movieText)
        fs.appendFile(textFile, movieText, function (err) {
          if (err) {
            console.log(err)
          }
        })
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
