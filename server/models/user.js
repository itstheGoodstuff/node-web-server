const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
        email: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            minLength: 1,
            validate: {
                validator: (value) => validator.isEmail(value),
                message: '{VALUE} is not a valid email'
            }
        },
        password: {
            type: String,
            require: true,
            minLength: 6
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
    });

    UserSchema.methods.toJSON = function () {
        var user = this;
        var userObject = user.toObject();

        return _.pick(userObject, ['_id', 'email']);
    };

    UserSchema.methods.generateAuthToken = function ()  {
        let user = this;
        let access = 'auth';
        let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

        user.tokens = user.tokens.concat([{access, token}]);

        return user.save().then(() => {
            console.log('Token:', token);
            return token;
        });
    };

    UserSchema.statics.findByToken = function (token)  {
        var User = this;
        var decoded;

        try {
            decoded = jwt.verify(token, 'abc123');
        } catch (e) {
            return Promise.reject();
        }

        return User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });
    };

    var User = mongoose.model('User', UserSchema);

module.exports = {User}