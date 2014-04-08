
/*
 * GET users listing.
 */
var CLIENT_ID = '97244566057-mjm5s2mhs5blo514go9jgngrc6ka99ic.apps.googleusercontent.com';
var REDIRECT_URL = 'http://localhost:3000/auth/google/callback';
var CLIENT_SECRET = '-DymiXJmOS0JNIzUfcDtfnqV';

var request = require('request');
var mongoose = require('mongoose');

var accessToken;

exports.list = function(req, res){
  res.send("respond with a resource");
};

//https://developers.google.com/accounts/docs/OAuth2UserAgent
exports.googleOauth = function(req, res){
    console.log("googleOauth");

    var url = "https://accounts.google.com/o/oauth2/auth?redirect_uri=" + REDIRECT_URL +"&response_type=code&client_id=" + CLIENT_ID + "&approval_prompt=force&scope=email%20profile&access_type=offline";
    res.redirect(url);
};

exports.googleOauthCallbak = function(req, res){
    console.log("googleOauthCallbak + " + req.query.code);

    var url = "https://accounts.google.com/o/oauth2/token";

    request.post({url:url, form:{
        code:req.query.code,
        client_id:CLIENT_ID,
        client_secret:CLIENT_SECRET,
        redirect_uri:REDIRECT_URL,
        grant_type:"authorization_code"}
    }, oauthAccessTokeCallback);

    function oauthAccessTokeCallback(error, response, body){
        if (error) {
            return console.error('failed:', err);
        }
        var token = JSON.parse(body);
        console.log('Token = ' + token.access_token);

        accessToken = token.access_token;

        var options = {
            url: "https://www.googleapis.com/plus/v1/people/me?access_token=" + token.access_token
        };

        request(options, userInfoCallback);
    }

    function userInfoCallback(error, response, body) {
        if (error) {
            return console.error('failed:', error);
        }
        var userInfo = JSON.parse(body);
        console.log('User Emails:', userInfo.emails[0].value);

        insertUserInfo(userInfo, userInfo.emails[0].value);
        res.render('user_info', { title: userInfo.displayName });
    }

    function insertUserInfo(userInfo, userEmail){
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
                    res.render('result', { title: err.message });
                    return handleError(err);
                }
                res.render('result', { title: 'success' });
            });
        });
    }
};