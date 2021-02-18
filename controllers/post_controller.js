const Post = require('../models/post');
const Comment = require('../models/comment');
const { localsName } = require('ejs');
const Like=require('../models/like');

module.exports.create=async function(req,res){
    try{
        console.log('first controller run');

        let post = await Post.create(
        {
            content:req.body.content,
            user:req.user._id         ////////becaz we pass user during authentication to access user data
        });
        if(post){
            console.log('then post created');
        }

        ///// it fetch ajax request//
        if (req.xhr){
            console.log('now data sent to home_post js for xhr request fetching');

            return res.status(200).json({
                data: {
                    post: post         /////////// it goes to home_post.js in ja folder
                },
                message: "Post created!"
            });
        }
        return res.redirect('back');

    }catch(err){
        console.log("error to create the post");
        return;
    }
    
}

module.exports.destroy =async function(req,res){

    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
             // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'post'});
            await Like.deleteMany({_id: {$in: post.comments}});

                post.remove();
                await Comment.deleteMany({post:req.params.id});

                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id       ///////// post_id goes to home_post.js
                        },
                        message: "Post deleted!"
                    });
                }

                return res.redirect('back');
                
            }
    }catch(err){
        console.log("error to delete the post");
        return;

    }
    
}