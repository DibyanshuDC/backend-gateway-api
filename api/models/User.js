const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
    trim: true
	},
	access:{
		type: String,
		required: true,
		default: 'auth'
	},
	usrkey: {
		type: String,
		unique: true,
		required: true,
    trim: true
	},
	tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
  }]
}, {
	timestamps: true,
	usePushEach: true
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email', 'usrkey']);
}

UserSchema.methods.generateAuthToken = function (accessType) {
  var user = this;
  var access = accessType;
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET, { expiresIn: '6h' }).toString();
  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByUserName = function (username) {
	var User = this;
	return User.findOne({
    'email': username,
  },{access: 0, tokens:0, createdAt: 0, updatedAt: 0, __v: 0});
};

UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}
	return User.findOne({
    '_id': decoded._id,
		'access': decoded.access,
		'tokens':{ $elemMatch: {'access' : decoded.access, token}},
  },{access: 0, tokens:0, createdAt: 0, updatedAt: 0, __v: 0});
};



const User = mongoose.model('User', UserSchema);
module.exports = {User};
