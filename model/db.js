var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
mongoose.connect('mongodb://todo:gdg@ds139360.mlab.com:39360/todo-gdg');
var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

module.exports=mongoose.model( 'Todo', Todo );

