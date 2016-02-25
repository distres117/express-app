var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Promise = require('bluebird'),
    Todo = require('./todo');


    
var userSchema = new Schema({
    _id: {
      type: Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    email: String
});

userSchema.methods.populateTodos = function(){
    var inst = this;
    return new Promise(function(res,rej){
       Todo.find({user: this._id})
        .then(function(todos){
        inst['todos'] = todos;
           res(inst); 
        });
    });
    
    
}



var user = mongoose.model('User', userSchema);
module.exports = user;