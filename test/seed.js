var User = require('../models/user.js'),
    Todo = require('../models/todo.js'),
    ObjectId = require('mongoose').Types.ObjectId,
    oid = Array(5).map(r=>ObjectId());

var _todos = [
    {content: "Feed the dog", user: oid[0], _id: oid[2] }, 
    {content: "Water the plants", user: oid[0], _id: oid[3] }, 
    {content: "Clean the house", user: oid[1] , _id: oid[4] }];

var _users = [
    {name: "Oliver", email: "omcrobbie@gmail.com", _id: oid[0] , todos: [oid[2],oid[3]]},
    {name: "Andrew", email: "apmcrobbie@gmail.com", _id: oid[1] , todos: [oid[4]]}];

module.exports = {
    todos: _todos.map(function(todo){
        return new Todo(todo);
    }),
    users: _users.map(function(user){
        return new User(user);  
    })
};