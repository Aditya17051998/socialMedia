const fs=require('fs');
const rfs = require('rotating-file-stream');
const path =require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
})

const development={
    name:'development',
    assets_path:'./assets',
    session_cookie_key:'blasomething',
    db:'codial_development',
    smtp:{
        service:'gmail',
        host:'smpt.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'singharush537@gmail.com',
            pass:'@Kushwaha@ditya19981705'
        }
    },
    google_clientID:"172003653863-nqr3fkd7s0eeskjntk9vf3ijqqgsueca.apps.googleusercontent.com",
    google_clientSecret:"kNB9h5ZunO4bgH36pAB26qEu",
    google_callbackURL:"http://localhost:800/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production={
    name:process.env.PRODUCTION,
    assets_path:process.env.ASSETS_PATH,
    session_cookie_key:process.env.COOKIE_SESSION_KEY,
    db:process.env.DB,
    smtp:{
        service:'gmail',
        host:'smpt.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS
        }
    },
    google_clientID:process.env.GOOGLE_CLIENT_ID,
    google_clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    google_callbackURL:process.env.GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}
////////// npm install -g win-node-env //////// for run script
// module.exports=development;
module.exports=eval(process.env.PRODUCTION)==undefined?development:production;