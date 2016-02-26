var User = require('../models/user.js'),
    Todo = require('../models/todo.js'),
    ObjectId = require('mongoose').Types.ObjectId;

function RefArray(arr,fn){
    for (var i in arr)
        this.objectIds.push(fn());
    this.arr = arr;
}

RefArray.prototype.objectIds = [];

RefArray.prototype.build = function(fields){
    var oids = this.objectIds;
  for (var obj of this.arr){
    for(var field in obj){
        if (fields.indexOf(field) > -1)
            obj[field] = Array.isArray(obj[field]) ? obj[field].map(i=>oids[i]) : oids[obj[field]];
    }
  }
  return this.arr;
}

var _todos = new RefArray([{
    content: "Feed the dog", user: 0, _id: 2 }, 
    {content: "Water the plants", user: 0, _id: 3 }, 
    {content: "Clean the house", user: 1 , _id: 4 }], ()=>ObjectId());

var _users = new RefArray([
    {name: "Oliver", email: "omcrobbie@gmail.com", _id:0 , todos: [2,3] },
    {name: "Andrew", email: "apmcrobbie@gmail.com", _id:1 , todos: [4] }
    ], ()=>ObjectId());


module.exports = {
    todos: _todos.build(['_id', 'user']).map(function(todo){
        return new Todo(todo);
    }),
    users: _users.build(['_id', 'todos']).map(function(user){
        return new User(user);  
    })
};