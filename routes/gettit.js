var express = require('express');
var router = express.Router();
var gettit = require('gettit');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

router.get('/',function(req,res,next){
	gettit.getSub('pics').then(function(response,err){
		gettit.parseSub(response).then(function(response,err){
			for(i=0;i<response.length;i++) {
				console.log(response[i]);
			}
			res.render('gets',{"entry":response});
		});
	});
});

module.exports = router;
