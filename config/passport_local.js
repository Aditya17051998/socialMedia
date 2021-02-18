
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');





passport.use(new LocalStrategy(
    {
    usernameField: 'email' ,           ///////////// by default localstrategy expect to finds creadential in parameter named "username" and "password" but if you have name differentially in login form them mentioned it
    passReqToCallback : true
    },
function(req,email,password, done){   /////first filled with email and second filled with password always
    // find a user and establish the identity
    //console.log(email,password);
    User.findOne({email: email}, function(err, user)  {     ///// property is in schema while value is passed by function email
        if (err){
            req.flash('error',err);
            //console.log('Error in finding user --> Passport');
            return done(err);
        }

        if (!user || user.password != password){
            req.flash('error','invalid username or password');
           // console.log('Invalid Username/Password');
            return done(null, false);  //// this function return that not login
        }

        return done(null, user);  //this function return "user " to serializer
    });
}


));
// serializing the user to decide which key is to be kept in the cookies
//here user.id is sending to set in cokkies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);  /////return user 
    });
});




// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign_in');
}





// setauthentication using passport

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;  //// you can now acess user data in user.ejs
    }

    next();
}



module.exports = passport;
