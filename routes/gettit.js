var express = require('express');
var router = express.Router();
var gettit = require('gettit');

router.get('/',function(req,res,next){
	gettit.getSub('worldnews').then(function(response,err){
		console.log(gettit.parseSub(response));
	});
	res.render('gets',{"nse":nse});
});

module.exports = router;
