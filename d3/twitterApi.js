/**
 * program to get more information using twitter api
 *  e.g. followers of a given user
 *  execution instructions:
 *  	npm install
 *  	node twitterApi.js
 */

var fs = require('fs');
var Twit = require('twit');	//https://github.com/ttezel/twit

var readline = require('readline');
var stream = require('stream');

var tweets = [];
var userids = [];
var users = [];
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
  getTweetsWithGeoCoordinates(cs_geo, geo_span);

});


function getTweetsWithHashtag(list,tag) {
	var hashtagtweets=[]
	for (var i = 0; i < list.length; i++) {
		if (tweets[i].text.toLowerCase().indexOf(tag) != -1) {
			hashtagtweets.push(tweets[i]);
		}			
	}
	//console.log(hashtagtweets);
	JSON.stringify(hashtagtweets);
	console.log("# of tweets with " + hashtag + " tag: " + hashtagtweets.length);
	getTweetsWithMinNRetweets(hashtagtweets,min_retweets); //need to pass in filteredtweets
	//getTweetsWithMinNFavorites(filteredTweets,min_fav);
	getUsersWithMinNRetweets(hashtagtweets);

}
//again, these request could be made while reading in 
function getTweetsWithMinNRetweets(list,N) {
	var retweetedStatusIds = [];
	//used rewteeted status as original tweet has several retweets  
	//but retweeted ones aren't retweeted as much
	for (var i = 0; i < list.length; i++) {
		if (tweets[i].retweeted_status && 
				(tweets[i].retweeted_status.retweet_count > N) &&
					retweetedStatusIds.indexOf(tweets[i].retweeted_status.id) == -1) {
			retweetedStatusIds.push(tweets[i].retweeted_status.id);
			list.push(tweets[i]);
		}			
	}
	console.log("# of retweets with min. " + N + " retweets: " + list.length);
}


function getUsersWithMinNRetweets(list) {
	for (var i = 0; i < list.length; i++) {
		if (tweets[i].retweeted_status && 
				(tweets[i].retweeted_status.retweet_count > min_retweets) && 
					userids.indexOf(tweets[i].retweeted_status.user.screen_name) == -1) 
		{
			//console.log(tweets[i].retweeted_status.user.screen_name);
			userids.push(tweets[i].user.screen_name);
			getUser(tweets[i].user.location);			
		}
	}
	console.log("# of users:" + userids.length);
}

//memory intensive; run on server / use subset
function getUser(location) {
	client.get('followers/ids', {location: 'Houston'}, function (err, data, response) {
		//console.log(data);
		users.push(data);
	});
}

function getTweetsWithGeoCoordinates(geo, span) {
	var geoTweets = [];
	if(!span) span = 0;
	for (var i = 0; i < tweets.length; i++) {
		if (tweets[i].coordinates) {
			
			if (geo) {
				var coord = tweets[i].coordinates.coordinates;
				 //if lying within specified region
				if ((coord[0] >= (geo[0] - span) && coord[0] <= (geo[0] + span)) && 
						(coord[1] >= (geo[1] - span) && coord[1] <= (geo[1] + span))) {
					geoTweets.push(tweets[i]);
				}
			}
			
			else { //all tweets containing geo information
				geoTweets.push(tweets[i]);
			}
		}			
	}
	var coord = geo? ("(" + geo[0] + "," + geo[1] + ")") : ""; 
	console.log("# of tweets with geo coordinates " + coord + ": " + geoTweets.length);
	getTweetsWithHashtag(geoTweets,hashtag);
}
