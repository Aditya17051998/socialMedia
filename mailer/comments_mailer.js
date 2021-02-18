const nodemailer=require('../config/nodemailer');
exports.newComment=(comment)=>{
    let htmlStrings=nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');
    nodemailer.transporter.sendMail({
        from:"singharush537@gmail.com",
        to:'kushwahaa1705@gmail.com',
        subject:"new email publishhed",
        html:htmlStrings
    },
    (err,info)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('sent email',info);
        return;
    });

}