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
	gettit.getSubTitles('worldnews').then(function(re){
		console.log(re);
	});
	gettit.getSubLinks('pics').then(function(re){
		return gettit.getPics(re);
	}).then(function(re){
		res.render('gets',{"mages":re});
	});

});

module.exports = router;
