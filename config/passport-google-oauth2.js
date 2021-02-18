const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/users');
const Token=require('../models/token');
const env = require('./enviroment');

passport.use(new googleStrategy({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error to finding user",err);
            return;
        }
        console.log(profile);
        if(user){
            // let token=Token.findOne({
            //     accessToken:accessToken
            // });
            console.log('google token',accessToken);
            return done(null,user);
        }else{
            let user=User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },
            function(err,user){
                if(err){
                    console.log("error in creating the user",err);
                    return;
                }else{
                    return done(null,user);
                }
            });
            // Token.create({
            //     user:user,
            //     accessToken:accessToken
            // });
        }
    });
}

));
module.exports=passport;