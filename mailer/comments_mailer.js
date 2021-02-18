const nodemailer=require('../config/nodemailer');
exports.newComment=(comment)=>{
    let htmlStrings=nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');
    nodemailer.transporter.sendMail({
        from:"singh@gmail.com",
        to:'kush@gmail.com',
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