var mongoose = require('mongoose');
    

function RefArray(model,arr,fn){
    for (var i in arr)
        this.objectIds.push(fn ? fn() : mongoose.Types.ObjectId());
    this.arr = arr;
    this.model = model
}

RefArray.prototype.objectIds = [];

RefArray.prototype.build = function(){
    var fields = Array.prototype.slice.call(arguments).concat(['_id']);
    var oids = this.objectIds;
  for (var obj of this.arr){
    for(var field in obj){
        if (fields.indexOf(field) > -1)
            obj[field] = Array.isArray(obj[field]) ? obj[field].map(i=>oids[i]) : oids[obj[field]];
    }
  }
  var model = mongoose.model(this.model);
  return this.arr.map(i=>new model(i))
}

module.exports = RefArray;