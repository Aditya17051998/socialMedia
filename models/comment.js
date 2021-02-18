const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content : {
        type:String,
        required:true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User_info'         //////// name of document in database which is defined in schema 
    },
    post : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'post'         //////// name of document in database which is defined in schema 
        }
    ],
    likes :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
});

const Comment = mongoose.model('Comments',commentSchema);
module.exports = Comment;