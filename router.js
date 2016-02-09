var router = require('express').Router();
var fakeModel = require('./todos');

router.param('id', function(req,res,next,id){
   req.todo = fakeModel.find(id);
   next();
});

router.route('/')
    .get(function(req,res){
        res.render('index', {todos: fakeModel.all()}); 
    })
    .post(function(req,res){
       fakeModel.create(req.body.content);
       res.redirect('/');
    });


router.route('/:id')
    .get(function(req,res){
        res.render('read', req.todo)
    })
    .delete(function(req,res){
        fakeModel.remove(req.todo.id);
        res.redirect('/');
    })
    .put(function(req,res){
       req.todo.update(req.body.content);
       res.render('read', req.todo);
    });


module.exports = router;