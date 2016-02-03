var todos = [];
var id = 0;

function create(content){
    var todo = new Todo(content);
    todos.push(todo);
    return todo;
}

function all(){
    return todos;
}

function find(id){
    return todos.filter(i=>i.id === id)[0];   
}

function remove(id){
    var todo = find(id);
    if (todo)
        todos.splice(todos.indexOf(todo), 1);
}

function Todo(content){
    this.content = content;
    this.id = String(id++);
    this.date = new Date();
}

Todo.prototype.read = function(){
  return this;  
};


Todo.prototype.update = function(content){
    this.content = content;
}

create("Walk the dog");
create("Clean the house");

module.exports = {create, find, all, remove, Todo};