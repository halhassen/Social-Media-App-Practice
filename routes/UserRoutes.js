var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

router.post('/register', function(req, res) {
	var user = new User(req.body);
	user.setPassword(req.body.password);
	user.save(function(err, result) {
		if(err) console.log(err);
		if(err) return res.status(500).send({err: "Issues with the server"});
		if(!result) return res.status(400).send({err: "You done messed up."});
		res.send();
	});
});

//local passport strategy
router.post('/login', function(req, res, next) { //goes to passport module, in config.
	passport.authenticate('local', function(err, user, info){ //calling from the passport
		if(!user) return res.status(400).send(info);
		res.send({token: user.generateJWT()}); //generating a token when there is a user in the collection.
	})(req, res, next);
});

module.exports = router;