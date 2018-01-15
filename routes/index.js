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
	
		axios('http://www.reddit.com/r/worldnews/.rss').then(function(response,err) {
			ps(response.data,function(err,data){
				var promises = [];
				for(var i = 0; i < data.feed.entry.length; i++) {
					promises.push(axios('http://www.reddit.com/r/worldnews/comments/'+data.feed.entry[i].id[0].substr(3)+'/.rss'));
				}
				axios.all(promises).then(function(values){
					var ments = [];
					for(i in values) {
						console.log(values[i]);
						ments.push(values[i].data);
						ps(values[i].data,function(err,p){
							ments.push(p);
						});
						
					}
					fs.writeFile(__dirname+'/../public/test.txt',strob(ments),function(err) {
						if(err) {
							return console.log(err);
						}
						res.render('index');
					});
				});
			});
		});


		//var debug = {};
		//axios.get('http://www.reddit.com/r/worldnews/.rss').then(function(response){
		//ps(response.data,function(err,sult){
		//	var test = sult.feed.entry.length;
		//	var words = [];
		//	var ments = {};
		//	for(var i = 0; i < sult.feed.entry.length; i++) {
		//		var id = sult.feed.entry[i].id[0].substr(3);
		//		var itle = shuffle(sult.feed.entry[i].title[0].split(" "));
		//		words.push({
		//			"id":id,
		//			"itle":itle
		//		});
		//	}
		//	for(var g = 0; g < words.length; g++) {
		//		console.log(words[g]);
		//		axios.get('http://www.reddit.com/r/worldnews/comments/'+words[g].id+'/.rss').then(function(rep){
		//			ps(rep.data,function(err,zult){
		//				console.log(strob(zult));
		//				debug["zult"+g] = zult;
		//			});
		//		}).catch(function(err){ 
		//			console.log(err);
		//		});
		//	}
		//	fs.writeFile(__dirname+'/../public/test.txt',strob(debug),function(err) {
		//		if(err) {
		//			return console.log(err);
		//		}
		//		res.render('index',{"words":words});
		//	});
		//});
		//ps(response.data.feed,function(err,result){
		//	var words = [];
		//	for(var i = 0; i < result.length; i++) {
		//		words.push(result[i]);
		//	}
		//});
//}).catch(function(err){
//		console.log(err);
//	});
});


module.exports = router;
