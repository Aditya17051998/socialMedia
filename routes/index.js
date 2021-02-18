const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


///  make it roots of other routes  /////////////
router.get('/',homeController.home);    ////on this routes  '/' homecontrooller is called but
router.use('/users',require('./users'));  ///// "/users" encounter then routes send to "/users" diactory in neighbour/////by this we can access other neighbour route////
router.use('/posts',require('./post'));
router.use('/comments',require('./comment'));
router.use('/likes',require('./like'));
//// for jwt authentication ///////////
router.use('/api',require('./api'));
/// for further routes we can 
////  router.use('/routes'.require('./routefile'));


module.exports = router;