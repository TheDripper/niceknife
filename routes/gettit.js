var express = require('express');
var router = express.Router();
var gettit = require('gettit');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

router.get('/',function(req,res,next){
	const dom = new JSDOM('<!DOCTYPE html>');
	gettit.getSub('pics').then(function(response,err){
		gettit.parseSub(response).then(function(response,err){
			var tags = [];
			console.log(dom);
			for(var i=0;i<response.length;i++) {
				var tent = response[i].content[0]._;
				var html = dom.window.document.createElement('div');
				html.innerHTML = tent.trim();
				var imgs = html.getElementsByTagName('img');
				for(var z=0;z<imgs.length;z++) {
					console.log(imgs[z].src);
					tags.push(imgs[z].src);
				}
			}
			res.render('gets',{"entry":tags});
		});
	});
});

module.exports = router;
