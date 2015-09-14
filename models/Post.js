var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	created: Date,
	body: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Post', PostSchema);