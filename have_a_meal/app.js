
/**
 * Module dependencies.
 */

require('./routes/mongoose_init');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var content = require('./routes/content');
var dbconnect = require('./routes/db_connect');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/views/index.html');
});
app.get('/users', user.list);
app.get('/googleOauth', user.googleOauth);
app.get('/auth/google/callback', user.googleOauthCallbak);

app.post('/insert/contents', dbconnect.insertMongoDBContentsInfo);
app.get('/select/contents', dbconnect.selectMongoDBContentsInfo);
app.del('/delete/contents', dbconnect.removeMongoDBContentsInfo);
app.put('/update/contents', dbconnect.updateMongoDBContentsInfo);


app.post('/insert/replay', dbconnect.insertMongoDBReplayContentsInfo);
app.get('/select/replay', dbconnect.selectMongoDBReplayContentsInfo);
app.del('/delete/replay', dbconnect.removeMongoDBReplayContentsInfo);

// 상단 리스트
app.get('/hotcontent', content.hotList);
app.get('/content', content.contentList);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
