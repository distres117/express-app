var mongoose = require('mongoose'),
    Promise = require('bluebird');

var db;

module.exports = function(){
    if (!db){
        db = mongoose.connect('mongodb://localhost/todoDb', function(err){
            if (err)
                console.log(err);
        });
    }
    return db;
}