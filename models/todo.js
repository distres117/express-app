var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var todoSchema = new Schema({
    _id:{
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
   content: {
       type:String,
       required: true
   },
   user: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   created: {
       type: Date,
       default: Date.now
   },
   status: {
       type: String,
       enum: {
           values: ['pending', 'complete'],
           message: 'value must be either pending or complete'
       }
   }
});

todoSchema.pre('save', function(next){
    this.status = 'pending';
    next();
})

var todo = mongoose.model('Todo', todoSchema);
module.exports = todo;