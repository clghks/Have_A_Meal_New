
/**
 * Module dependencies.
 */

require('./routes/mongoose_init');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/googleOauth', user.googleOauth);
app.get('/auth/google/callback', user.googleOauthCallbak);

app.post('/insert/contents', dbconnect.insertMongoDBContentsInfo);
app.get('/select/contents', dbconnect.selectMongoDBContentsInfo);

app.post('/insert/replay', dbconnect.insertMongoDBReplayContentsInfo);
app.get('/select/replay', dbconnect.selectMongoDBReplayContentsInfo);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
