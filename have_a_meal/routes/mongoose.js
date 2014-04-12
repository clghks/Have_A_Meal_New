
/*
 * GET home page.
 */
var mongoose = require('mongoose');

exports.insertMongoDBUserInfo = function(userInfo, userEmail, accessToken, resultCallback){
    console.log('db open');
    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log('open');

        var userSchema = mongoose.Schema({
            name: String,
            email: String,
            access_token: String
        })
        var User = mongoose.model('users', userSchema);
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

