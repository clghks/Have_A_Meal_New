
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var schema = require('../model/schema');
var User = mongoose.model('users', schema.getschema().user());
var Contents = mongoose.model('contnets', schema.getschema().contents());
var ReplayContents = mongoose.model('replayContnets', schema.getschema().replyContents());

exports.insertMongoDBContentsInfo = function(req, res){
    var contents = new Contents(req.body);

    contents.save(function callback(err){
        if (err){
            return res.send(err.message);;
        }
        res.send("Success");
    })
};

exports.selectMongoDBContentsInfo = function(req, res){
    console.log('req.query = ' + req.query);
    var contents = Contents.find(req.query, function (err, contents) {
        if (err){
            return res.send(err.message);;
        }
        res.send("Success");
    });
};

exports.insertMongoDBReplayContentsInfo = function(req, res){
    var replayContents = new ReplayContents(req.body);

    replayContents.save(function callback(err){
        if (err){
            return res.send(err.message);;
        }

        res.send("Success");
    })
};

exports.selectMongoDBReplayContentsInfo = function(req, res){
    console.log('req.query = ' + req.query);
    var replayContents = ReplayContents.find(req.query, function (err, contents) {
        if (err){
            return res.send(err.message);;
        }
        contents.forEach(function (prop) {
            console.log('id = ' + prop.get('userId'));
        });
        res.send("Success");
    });
};

exports.insertMongoDBUserInfo = function(userInfo, userEmail, accessToken, resultCallback){
    var user = new User({ name: userInfo.displayName, id:userEmail, access_token:accessToken});
    user.save(function callback(err){
        if (err){
            resultCallback(err.message);
            return handleError(err);
        }
        resultCallback(userInfo.displayName);
    });
};

