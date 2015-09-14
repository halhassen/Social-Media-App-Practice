var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');  //possibly change to just User
var jwt = require('express-jwt');

var auth = jwt({
	userProperty : 'payload',
	secret : '_secretdin'
});

router.param('id', function(req, res, next, id) {
	req._id = id;
	next();
});
 //ref post routes
 router.post('/', auth, function(req, res) {
 	console.log(req.body);
 	var post = new Post(req.body);
 	post.created = new Date();
 	post.body = req.body.body;
 	post.user = req.payload.id;
 	post.save(function(err, result) {
 		if (err) return res.status(500).send({
 			err: "There is a problem"
 		});
 			if(!result) return res.status(400).send({
 				err: "Could not create post"
 			});
 				User.update({_id: post.user}, {$push: {
 					posts: {
 						_id: result._id
 					}
 				}}, function(err, user) {
 					if(err) return res.status(500).send({err: "There was an error"});
 					if(!user) return res.status(400).send({err: "this error should never happen"});
 					Post.findOne({_id : result._id }).populate("user")
 					.exec(function(err, post) {
 						res.send(post);
 					})
 				})
 			});
 });

 router.get('/', function(req, res) {
 	Post.find({}).populate('user')
 	.exec(function(err, posts) {
 		console.log(posts);
 		if(err) return res.status(500).send({err: "error getting all posts"});
 		if(!posts) return res.status(500).send({err: "posts do not exist"});
 		res.send(posts);
 	});
 });

 router.get('/:id', function(req, res) {
 	console.log(req.post);
 	res.send(req.post);
 });

 router.delete("/:id", function(req,res){
 Post.remove({_id: req._id}) //_id is the property, req._id is the value
 .exec(function(err, post){
 	if(err) return res.status(500).send({err: "Error with getting all posts"});
 	if(!post) return res.status(400).send({err: "Posts do not exist"});
 	res.send(post);
 });
});


 module.exports = router;