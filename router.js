var router = require('express').Router();
var fakeModel = require('./todos');

router.get('/',function(req,res){
   res.render('index', {todos: fakeModel.all()}); 
});

router.param('id', function(req,res,next,id){
   req.todo = fakeModel.find(id);
   next();
});
router.route('/:id')
    .get(function(req,res){
        res.render('read', req.todo)
    })
    .delete(function(req,res){
        fakeModel.remove(req.todo.id);
        res.redirect('/');
    })


module.exports = router;