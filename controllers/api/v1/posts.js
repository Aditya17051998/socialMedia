const Post=require('../../../models/post');
const Comments=require('../../../models/comment');
module.exports.posts=async function(req,res){

    
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comment',
        model: 'Comments',        
        populate:{
            path :'user',
            model :'User_info'     //include model is compulsary
        }
    });
    return res.json(200,{
        message:"list of posts",
        posts:posts
    })
}
module.exports.destroy =async function(req,res){

        
        try{
            let post = await Post.findById(req.params.id);
                    if(post.user==req.user.id){
                        post.remove();
                    await Comments.deleteMany({post:req.params.id});
    
                    
                    return res.json(200,{
                        message:"post delteded"
                    });
                    }
        }catch(err){
            console.log("error to delete the post");
            return res.json(500,{
                message:"enternal server error"
            });
    
        }
    
}