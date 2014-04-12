
/*
 * GET users listing.
 */
var CLIENT_ID = '97244566057-mjm5s2mhs5blo514go9jgngrc6ka99ic.apps.googleusercontent.com';
var REDIRECT_URL = 'http://localhost:3000/auth/google/callback';
var CLIENT_SECRET = '-DymiXJmOS0JNIzUfcDtfnqV';
var URL_REDIRECT = 'https://accounts.google.com/o/oauth2/auth?redirect_uri=' + REDIRECT_URL +'&response_type=code&client_id=' + CLIENT_ID + '&approval_prompt=force&scope=email%20profile&access_type=offline';
var URL_TOKEN = 'https://accounts.google.com/o/oauth2/token';
var URL_ACCECC_TOKEN = 'https://www.googleapis.com/plus/v1/people/me?access_token=';

var request = require('request');
var mongoose = require('mongoose');
var dbInsert = require('./mongoose');

exports.list = function(req, res){
  res.send("respond with a resource");
};

//https://developers.google.com/accounts/docs/OAuth2UserAgent
exports.googleOauth = function(req, res){
    res.redirect(URL_REDIRECT);
};

exports.googleOauthCallbak = function(req, res){
    console.log("googleOauthCallbak + " + req.query.code);

    request.post({url:URL_TOKEN, form:{
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

        var options = {
            url: URL_ACCECC_TOKEN + token.access_token
        };

        request(options, function(error, response, body){
            userInfoCallback(error, response, body, token.access_token);
        });
    }

    function userInfoCallback(error, response, body, accessToken) {
        if (error) {
            return console.error('failed:', error);
        }
        var userInfo = JSON.parse(body);
        console.log('User Emails:', userInfo.emails[0].value);

        dbInsert.insertMongoDBUserInfo(userInfo, userInfo.emails[0].value, accessToken, sendResultPage);
    }

    function sendResultPage(message){
        res.render('result', { title: message });
    }
};