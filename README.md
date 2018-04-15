# LIRI - Node Application
LIRI is like SIRI...but not.
<br/>
LIRI stands for language interpretation and recognition interface. In this app, you may use LIRI to grab a variety of data using one of the following four commands: <br>
```
- my-tweets
- spotify-this-song (add song name after command - optional)
- movie-this (add movie name after command - optional)
- do-what-it-says
```
## Getting Started
### Prerequisites
- Clone repo to your computer
- Run ```npm install`` in Terminal
- Open project in terminal and run one of the following four commands described below:
1.```node liri.js my-tweets```<br/>
This command will display my last 20 tweets as well as their created_at date.
2.```node liri.js spotify-this-song 'song name here'```<br/>
This command will show the song artist, name, preview link, and album in your terminal. If no song is specified, it will default to "The Sign" by Ace of Base.
3.```node liri.js movie-this 'movie title here'```<br/>
This command will show the movie title, release year, IMDB rating, Rotten Tomatoes rating, production country, language, plot, and actors in your terminal. If no movie is specified, it will defaul to "Mr. Nobody."
4.```node liri.js do-what-it-says```<br/>
This command will read the text from the ```random.txt``` file and will run the spotify-this-song command for the song. 
**All commands will log the results t othe log.txt file.**

### Installing
- Download the latest version of node to your computer. 
- NPM packages:
-- **Twitter**: ``npm install twitter``
-- **Spotify**: ``npm install spotify``
-- **Request**: ``npm install request``
-- **FS**: ``npm install fs```
-- **Moment**: ```npm install moment```
- **You will have to get your own Spotify and Twitter keys and put them into a .env file, or this app will not work!**

### Built With
- Node.js
- Twitter NPM Package - https://www.npmjs.com/package/twitter
- Spotify NPM Package - https://www.npmjs.com/package/spotify
- Request NPM Package - https://www.npmjs.com/package/request

### Authors
Becca Harris
