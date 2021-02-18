const Post = require('../models/post');
const Comment = require('../models/comment');
const commentmailer= require('../mailer/comments_mailer');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like=require('../models/like');

module.exports.create =async function(req,res){

    try{
        let post =await Post.findById(req.body.post);
        if(post){
            let comment=await Comment.create({
                content:req.body.content,
                user : req.user._id,
                post:req.body.post 
            });
                
        post.comment.push(comment);
        post.save();
        res.redirect('/');
        
        comment=await comment.populate('user','name email').execPopulate();
        
                 ///////prepolulate comment by calling commentmailer
        //commentmailer.newComment(comment);    ///no used of it becouse this function called from comment worker
        let job=queue.create('emails',comment).save(function(err){
            if(err){
                console.log('error to create mailworker',err);
            }
            console.log('job inqued',job.id);
        })

        }
        


    }catch(err){
        console.log('error to create comment',err);
        return;

    }

}

module.exports.destroy =async function(req,res){

    try{
        let comment =await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            let postid=comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postid,{$pull:{comment:req.params.id}});
            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});


            return res.redirect('back');

        }

    }catch(err){
        console.log('error to dlete comment');
        return;

    }
    
}