var express = require('express');
var router = express.Router();
var gettit = require('gettit');
var axios = require('axios');
var throttle = require('lodash.throttle');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
				//var html = dom.window.document.createElement('div');
				//html.innerHTML = tent.trim();
				//var imgs = html.getElementsByTagName('img');

router.get('/',function(req,res,next){
	const dom = new JSDOM('<!DOCTYPE html>');
	gettit.getSub('pics').then(function(response,err){
		gettit.parseSub(response).then(function(response,err){
			var tags = [];
			var roses = [];
			var po = response.feed.entry;
			for(var i=0; i<po.length; i++) {
				//var link = po[i].link[0].$.href;
			}
			//throw new Error('fuck');
			Promise.all(roses).then(function(values){
				console.log(values);
			}).catch(function(err){
				console.log(err);
			});
			res.render('gets',{"entry":tags});
		});
	});
});

module.exports = router;
