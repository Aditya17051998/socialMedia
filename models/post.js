const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type:String,
        required:true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User_info'         //////// name of document in database which is defined in schema ////what error if i change name
    },
    comment : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comments'         //////// name of document in database which is defined in schema 
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

const Post = mongoose.model('post',postSchema);
module.exports = Post;