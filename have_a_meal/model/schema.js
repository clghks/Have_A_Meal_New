var mongoose = require('mongoose');

var schema = {
    user : function() {
        return mongoose.Schema({
            name: String,
            email: String,
            access_token: String
        })
    }
}

exports.getschema = function(){
    return schema;
}