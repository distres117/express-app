var User = require('../models/user.js'),
    Todo = require('../models/todo.js'),
    ObjectId = require('mongoose').Types.ObjectId,
    rel1 = ObjectId(), 
    rel2 = ObjectId()

var _todos = [
    {content: "Feed the dog", user:rel1 }, 
    {content: "Water the plants", user: rel1}, 
    {content: "Clean the house", user: rel2}];

var _users = [
    {name: "Oliver", email: "omcrobbie@gmail.com", _id: rel1},
    {name: "Andrew", email: "apmcrobbie@gmail.com", _id: rel2}];

module.exports = {
    todos: _todos.map(function(todo){
        return new Todo(todo);
    }),
    users: _users.map(function(user){
        return new User(user);  
    })
};