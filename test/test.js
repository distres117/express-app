var expect = require('chai').expect, db;
var request = require('supertest');
var app = require('../app');

function getData(){
    db = require('../todos');
}

function killData(){
    delete require.cache['/home/ubuntu/workspace/todos.js'];
}

describe('Perform basic operations', function(){
    beforeEach(function(){
        getData();
    });
    afterEach(function(){
        killData();
    });

   it('Should return all todos', function(){
      expect(db.all().length > 0).to.be.true;
   });
   
   it('Should return a specific todo', function(){
      expect(db.find("1").content).to.equal("Clean the house"); 
   });
   it('Should remove a todo', function(){
       db.remove("1")
      expect(db.all().length).to.equal(1); 
   });
   it('Should create a todo', function(){
      db.create("New todo!");
      expect(db.all().length).to.equal(3);
   });
   it('Should be able to update', function(){
       var todo = db.find("1");
       todo.update("Clean the dog");
       expect(todo.content).to.equal("Clean the dog");
   });
});

describe('Testing routes', function(){
    it('GET from home route', function(done){
       request(app)
        .get('/').expect(200,done);
    });
    it('POST to home route', function(done){
       request(app)
        .post('/')
        .type('form')
        .send({content: "New todo!"})
        .end(function(){
            db = require('../router').db;
            var todo = db.find("2");
            expect(todo.content).to.equal("New todo!");
            done();
        });
    });
    it('DELETE todo', function(done){
       //delete require.cache['/home/ubuntu/workspace/router.js'];
       request(app)
        .delete('/2')
        .expect(302)
        .end(function(){
            expect(db.all().length).to.equal(2);
            done();
        });
       
    });
    it('Update todo', function(done) {
       request(app)
        .put('/1')
        .type('form')
        .send({content: "Updated content!"})
        .end(function(){
           expect(db.find("1").content).to.equal("Updated content!");
           done();
        });
    });
});
