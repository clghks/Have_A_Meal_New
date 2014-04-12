var mongoose = require('mongoose');

var schema = {
    user : function() {
        return mongoose.Schema({
            name: String,
            email: String,
            access_token: String
        })
    },

    contents : function() {
        return mongoose.Schema({
            registerDateTime : Date,
            modifiyDateTime : { type: Date, default: Date.now },
            isPublicity : Boolean,
            recruitStartDateTime : Date,
            recruitEndDateTime : Date,
            foodType : Number,
            subject : String,
            contents : String,
            gpsX : Number,
            gpsY : Number,
            meetingDateTime : Date,
            count : Number,
            fee : Number,
            joinUsers : String,
            attachedFile : String
        })
    }
}

exports.getschema = function(){
    return schema;
}