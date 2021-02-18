const Post = require('../models/post');
const User = require('../models/users');

module.exports.home = async function(req,res){

    try{

     //////////  prepopulation for showing user data with post ////////

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
    })
    .populate('likes');

    let users = await User.find({});

    return res.render('home',{
         title:'Codial',
         posts:posts,
         all_users:users
     });


    }catch(err){

        console.log('error in print user');
        return;

    }  

}
