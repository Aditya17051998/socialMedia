const User = require('../models/users');
const { findById } = require('../models/users');
//const { remove } = require('../models/users');
const path= require('path');
const fs = require('fs');

module.exports.profile = function(req,res){

    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id,function(err,user){
    //         if(user){
    //     console.log(req.cookies);
          User.findById(req.params.id,function(err,user){
            return res.render('user',{
                name : 'my profile',
                title : 'profile page',
                user_profile:user
            });

          }); 
}

module.exports.update =async function(req,res){
    
    if(req.user.id==req.params.id){
        try{
            let user =await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('****** multer error ****',err);}
                console.log(req.file);
                
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){

                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                        
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                console.log(user);
                return res.redirect('back');
            });

        }catch{
            console.log("error to update the post");
            return res.redirect('back');

        }

    }else{
        return res.status(401).send('Unauthorized');

    }
}

module.exports.signin = function(req,res){
    if (req.isAuthenticated()){           ///////if you already authenticated then go to profile
        return res.redirect('/users/profile');
    }
    return res.render('sign_in',{
        title:'signin page'
    });
}

module.exports.signup = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up',{
        title:'signup page'
    });
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.conferm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,newUser){
        if(err){
            console.log('error in finding user email');
            return;
        }
        if(!newUser){
            User.create(req.body,function(err,newUser){
                if(err){
                    console.log('error in creating user email');
                    return;
                }
                return res.redirect('/users/sign_in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req, res){
    req.flash('success',"logged in successfully");
    return res.redirect('/');
}

//module.exports.create_session = function(req,res){
  //  return res.redirect('/');
        //find a user
        // User.findOne({email:req.body.email},function(err,user){
        //       if(err){
        //           console.log('error in finding user for sign in');
        //           return;
        //       }
        //       if(user){
        //           /////////check password is correct or not
        //           if(user.password != req.body.password){
        //               return res.redirect('back');
        //            }
        //            ////////////// sign in and create session
        //            res.cookie('user_id',user.id);
        //            return res.redirect('/users/profile');
        //       }
        //       else{
        //           /////  user not found
        //           return res.redirect('back');

        //       }
              
        // });

//}

////  simple logout and return to homepage where session have been distroyed
module.exports.signout= function(req,res){ 
    req.logout();
    req.flash('success',"logged out successfully");
    return res.redirect('/');

}
