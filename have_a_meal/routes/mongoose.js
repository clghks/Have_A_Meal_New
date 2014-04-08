
/*
 * GET home page.
 */
var mongoose = require('mongoose');

exports.page = function(req, res){
    res.render('mongoose', { title: 'Mongoose' });
};

exports.insertUserInfo = function(req, res){
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
        var user = new User({ name: 'choi', email:'ch' });
        user.save(function callback(err){
            if (err){
                res.render('result', { title: err.message });
                return handleError(err);
            }
            res.render('result', { title: 'success' });
        });
    });

};

exports.open = function(req, res){
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
        var user = new User({ name: 'choi', email:'ch' });
        user.save(function callback(err){
            if (err){
                res.render('result', { title: err.message });
                return handleError(err);
            }
            res.render('result', { title: 'success' });
        });
    });
};

