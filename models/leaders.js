const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var leaderSchema = new Schema ({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true,
		unique: true
	},
	designation : {
		type: String,
		required: true,
		unique: true
	},
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	featured :{
		type: Boolean,
		required: true,
		default: false
	}
},{
	timestamps: true
});

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;