/**
 * program to get more information using twitter api
 *  e.g. followers of a given user
 *  execution instructions:
 *  	npm install
 *  	node twitterApi.js
 */
var fs = require('fs');
var Twit = require('twit'); //https://github.com/ttezel/twit

var readline = require('readline');
var stream = require('stream');

var tweets = [];
var userids = [];
var users = [];
var filteredusers =[];
var min_retweets = 2;
var min_fav = 3;
var hashtag = "#blacklivesmatter";
var filteredTweets = [];
var cs_geo = [-71.05, 42.36];
var geo_span = 12;

//obtain access tokens for your account from https://apps.twitter.com/
var client = new Twit({
    consumer_key: 'TYPexXQNHgcLas36bETpHixWc',
    consumer_secret: 'RMyRcnbtCaZVs8sgIaBhcNVRDTxv2T9oBAmOsn9gbE64hvUCHX',
    access_token: '457916881-ghZyhkIracqnTLb70h01kQAPKVzqZbOTOqFVs8Eh',
    access_token_secret: 'WHZMmg373oLhy8PxB0C6BT0RQ72ORYjjwb3AtphcmtwZI'
});

var fileloc = '../testing/RiseUpOctober';
var istream = fs.createReadStream(fileloc);
var ostream = new stream;
var rl = readline.createInterface(istream, ostream);

rl.on('line', function(line) {
    tweets.push(JSON.parse(line));
});

rl.on('close', function() {
    console.log(tweets.length);
    getPopularUsers();

});



function getPopularUsers(){
  for(var i = 0; i < tweets.length; i++){
    if(tweets[i].user.followers_count &&
        tweets[i].user.followers_count > 1000000 &&
        users.indexOf(tweets[i].user.screen_name) == -1){
            users.push("screen_name: "+ tweets[i].user.screen_name);
            users.push("description: "+ tweets[i].user.description);
            //users.push("retweet_count: "+ tweets[i].retweet_count);
            //users.push("media: " + tweets[i].retweeted_status.entities.hashtags.text);
            users.push("favorite_count: " + tweets[i].user.favourites_count);
            users.push("text: " + tweets[i].text);
    }
  }


  console.log("Users with more than 800 followers: " + users.length);
  var outputFilename = 'tweets2.json';
fs.writeFile(outputFilename, JSON.stringify(users, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 
}

if (!library)
   var library = {};

library.json = {
   replacer: function(match, pIndent, pKey, pVal, pEnd) {
      var key = '<span class=json-key>';
      var val = '<span class=json-value>';
      var str = '<span class=json-string>';
      var r = pIndent || '';
      if (pKey)
         r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
      if (pVal)
         r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
      return r + (pEnd || '');
      },
   prettyPrint: function(obj) {
      var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3)
         .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
         .replace(/</g, '&lt;').replace(/>/g, '&gt;')
         .replace(jsonLine, library.json.replacer);
      }
   };

   //$('#obj').html(library.json.prettyPrint(obj));
