/**
 * Created by ChiHwan on 2014. 4. 19..
 */
var mongoose = require('mongoose');
var options = {
    server: { poolSize: 5 },
    keepAlive: 1
}
mongoose.connect('mongodb://localhost/test', options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.info("db open!");
});
