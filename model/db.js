var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/todo');
var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

module.exports=mongoose.model( 'Todo', Todo );

