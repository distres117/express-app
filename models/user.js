var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Promise = require('bluebird'),
    Todo = require('./todo');


    
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}]
});


var user = mongoose.model('User', userSchema);
module.exports = user;