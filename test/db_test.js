var expect = require('chai').expect,
    app = require('../app'),
    request = require("supertest")(app),
    connect = require('../models'),
    Todo = require('../models/todo'),
    User = require('../models/user'),
    seed = require('./seed'),
    Promise = require('bluebird');

xdescribe('Basic db ops', function(){
   it('connects to db', function(done){
      done();
   }); 
   it('gets collection', function(done){
      Todo.find()
      .then(function(todos){
          expect(todos.length).to.equal(3);
          done();
      })
      .catch(done);
   });
});

describe('Model ops', function(){
   before(function(){
      return connect()
        .then(function(){
            Promise.all([Todo.insertMany(seed.todos), User.insertMany(seed.users) ]);
        });
   });
  after(function(){
        return Promise.all([Todo.remove(), User.remove() ]);
  });
   it('adds id when not supplied', function(done){
      User.create({
         name: "Jenny",
         email: "jenny@jenny.com"
      })
      .then(function(user){
          expect(user).to.have.property('_id');
          done();
      })
      .catch(function(err){
        done(err);  
      })
   });
   it('gets users associated todos using populate', function(done){
      User.findOne({name: 'Oliver'}).populate('todos')
      .then(function(user){
          expect(user).to.have.property('todos');
          expect(user.todos.length).to.equal(2);
          done();
      })
      .catch(done);
      
   });
   it('gets user from associated todo', function(done){
       Todo.findOne()
       .populate('user_id')
       .then(function(todo){
           expect(todo).to.have.property('user');
           done();
       })
       .catch(done);
   });
});