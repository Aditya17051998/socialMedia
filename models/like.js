const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User_Info'
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'

    },
    onModel:{
        type:String,
        required:true,
        enum:['post','Comments']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;