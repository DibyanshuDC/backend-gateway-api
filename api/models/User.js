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
	return _.pick(userObject, ['email', 'usrkey']);
}

UserSchema.methods.generateAuthToken = function (accessType) {
  var user = this;
	var access = accessType;
	var token = jwt.sign({username: user.email, key: user.usrkey, access}, process.env.JWT_SECRET, { expiresIn: '6h' }).toString();
  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByUserName = function (username) {
	var User = this;
	return User.findOne({
    'email': username,
  },{ createdAt: 0, updatedAt: 0, __v: 0});
};

UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		if(e.message == "jwt expired"){
			// Delete the token I will discuss
		}
		return Promise.reject(e);
	}

	return User.findOne({
    'email': decoded.username,
		'access': 'auth',
		'tokens':{ $elemMatch: {'access' : decoded.access, token}},
	},{_id:0, password:0, access: 0, tokens:0, createdAt: 0, updatedAt: 0, __v: 0});
};



const User = mongoose.model('User', UserSchema);
module.exports = {User};
