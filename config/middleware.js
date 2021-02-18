module.exports.setFlash = function(req,res,next){       //////this is for flash messege 
    res.locals.flash= {
        'success' : req.flash('success'),      /////////use flash.seccess for successfulyy run
        'error' : req.flash('error')          /////use flash.error for error found
    }
    next();
}