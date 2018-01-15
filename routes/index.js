var express = require('express');
var router = express.Router();
var axios = require('axios');
var ps = require('xml2js').parseString;
var fs = require('fs');
var strob = require('stringify-object');
var striptags = require('striptags');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

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
			ps(response.data,function(err,zult){
				var posts = [];
				var roses = [];
				var dope = [];
				for(i in zult.feed.entry) {
					posts.push(zult.feed.entry[i].id[0].substr(3));
				}
				for (p in posts) {
					var post = posts[p];
					roses.push(axios('http://www.reddit.com/r/worldnews/comments/'+post+'/.rss'));
				}
				Promise.all(roses).then(function(values){
					for (v in values) {
						ps(values[v].data,function(err,zult){ // POSTS
							for (z in zult) { // POST
								var post = {};
								var itle = zult[z].title[0];
								itle = itle.substr(0,itle.length-11);
								post['title'] = itle;
								var comms = [];
								var ments = zult[z].entry;
								for(m in ments) { // COMMENTS
									var pushit = ments[m].content[0]._;
									pushit = pushit.substr(34);
									pushit = pushit.substr(0,pushit.length-25);
									pushit = entities.decode(striptags(pushit));
									comms.push(pushit);
								}
								comms.shift();
								post['ments'] = comms;
								dope.push(post);
							}


							fs.writeFile(__dirname+'/../public/test.txt',strob(dope),function(err) {
								if(err) {
									return console.log(err);
								}
							});
						});
					}
					res.render('index',{"dope":dope});
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
