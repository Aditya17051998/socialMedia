


const Token=require('../../../models/token');
const User=require('../../../models/users');
const jwt=require('jsonwebtoken');
const env= require('../../../config/enviroment');

module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.password !=req.body.password){
            return res.json(422,{
                message:"invalid username or password"
            });
        }
       // let token=jwt.sign(user.toJSON(),'codeial',{expiresIn:1000000});
        // Token.create({
        //     user:user,
        //     accessToken:token
        // });
        return res.json(200,{
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:1000000})  ////toJSON convert user to json formate ,here use a key to encrypt the token
            },
            message:"here is your token please keep it safe"
        })

    }
    catch{
        console.log("error to fetching user");
        return res.json(500,{
            message:"internal server error"
        });

    }
}