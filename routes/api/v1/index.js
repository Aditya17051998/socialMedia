const express=require('express');
const router=express.Router();
const postApi=require('../../../controllers/api/v1/posts');


router.use('/posts',require('./posts'));
router.use('/users',require('./users'));
//router.delete('posts/:id',postApi.destroy);

module.exports=router;