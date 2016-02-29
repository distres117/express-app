var RefArray= require('../utils/ref-array');

var _todos = new RefArray('Todo', ['user'], [{
    content: "Feed the dog", user: 0, _id: 2 }, 
    {content: "Water the plants", user: 0, _id: 3 }, 
    {content: "Clean the house", user: 1 , _id: 4 }]);

var _users = new RefArray('User', ['todos'], [
    {name: "Oliver", email: "omcrobbie@gmail.com", _id:0 , todos: [2,3] },
    {name: "Andrew", email: "apmcrobbie@gmail.com", _id:1 , todos: [4] }
    ]);

module.exports = {
    todos: _todos.build(),
    users: _users.build() 
};