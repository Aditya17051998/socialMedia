const express = require('express');
const router = express.Router();
const passport = require('passport');
const  usersController = require('../controllers/users_controller');
//const { checkAuthentication } = require('../config/passport_local');

//////////// if authentication is done which is defined in paasport_local.js use as a middleware
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);   ///// when profile encounter then get request is called
router.post('/update/:id',passport.checkAuthentication,usersController.update);
// router.post('/profile/create-user',usersController.signin);
router.get('/sign_in',usersController.signin);
router.get('/sign_up',usersController.signup);
router.post('/createUser',usersController.create);
// router.post('/create-session',usersController.create_session);
// router.get('/sign_out',usersController.signout);
/////use passport as a middleware when you sign in your cookie id stored in browser///////////
//router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign_in'}),usersController.create_session);
// use passport as a middleware to authenticate
// login form is submitted to server via post method using passport.authenticate() with local startegy will handle login request
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign_in'},
), usersController.createSession);

router.get('/sign_out',usersController.signout);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',
            passport.authenticate('google',{failureRedirect:'/users/sign_in'}),
            usersController.createSession);


module.exports = router;