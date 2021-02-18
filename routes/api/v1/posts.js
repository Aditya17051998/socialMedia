const express = require('express');
const { session } = require('passport');
const passport = require('passport');
const router = express.Router();
const postApi=require('../../../controllers/api/v1/posts');

router.get('/',postApi.posts);
router.get('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);
// why use get //// delete why didnt work
// router.get('/:id',postApi.destroy);

module.exports=router;