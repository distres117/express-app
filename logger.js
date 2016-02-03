module.exports = function(req,res,next){
    var temp = res.end;
    res.end = function(){
        console.log(req.method, req.path, res.statusCode);
        temp.apply(this, arguments);
    };
    next();
}