var mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/todoDb');
    var db = mongoose.connection;
    db.on('error', function(err){
        console.error(err);
    });
    return db;
}