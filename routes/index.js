var express = require('express');
var router = express.Router();
var axios = require('axios');
var ps = require('xml2js').parseString;
var fs = require('fs');
var strob = require('stringify-object');

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/* GET home page. */
router.get('/', function(req, res, next) {
	axios.get('http://www.reddit.com/r/worldnews/.rss').then(function(response){
		ps(response.data,function(err,sult){
			var test = sult.feed.entry.length;
			var words = [];
			for(var i = 0; i < sult.feed.entry.length; i++) {
				console.log('test');
				console.log(strob(sult.feed.entry[i].title));
				words.push(sult.feed.entry[i].title);
			}
			words = shuffle(words);
			fs.writeFile(__dirname+'/../public/test.txt',words,function(err) {
				if(err) {
					return console.log(err);
				}
				res.render('index');
			});
		});
		//ps(response.data.feed,function(err,result){
		//	var words = [];
		//	for(var i = 0; i < result.length; i++) {
		//		words.push(result[i]);
		//	}
		//});
}).catch(function(err){
		console.log(err);
	});
});


module.exports = router;
