var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(function(username, password, done) {
	User.findOne({username: username})
	.exec(function(err, user) {
		if(err) return res.status(500).send({err: "Server is having issues."});
		if(!user) return res.status(400).send({err: "User does not exist"});
		if(!user.checkPassword(password)) return res.status(400).send({err: "Invalid username and password combination"});
		return done(null, user);
	});
}));

/*
possibly use Twitter passport
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  https://github.com/jaredhanson/passport-twitter
	
  http://passportjs.org
  */