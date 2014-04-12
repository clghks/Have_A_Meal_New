
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var schema = require('../model/schema');

exports.insertMongoDBContentsInfo = function(){

};

exports.selectMongoDBContentsInfo = function(){

};

exports.insertMongoDBUserInfo = function(userInfo, userEmail, accessToken, resultCallback){
    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        var User = mongoose.model('users', schema.getschema().user());
        var user = new User({ name: userInfo.displayName, email:userEmail, access_token:accessToken});
        user.save(function callback(err){
            if (err){
                resultCallback(err.message);
                return handleError(err);
            }
            resultCallback(userInfo.displayName);
        });
    });
};

