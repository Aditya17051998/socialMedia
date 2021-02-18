const express = require('express');      
const env = require('./config/enviroment');
const logger = require('morgan');   

// if(env){
//     console.log("env data",env);
// }                             ////// import express module
const db = require('./config/mongoose');
const app = express(); 
require('./config/view_helper')(app); 
//helper(app);
var bodyParser = require('body-parser');                                                ///// use express module and now we work by "app"
const port = 800;
const cors=require('cors');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2');

const MongoStore = require('connect-mongo')(session);
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
const flash = require('connect-flash');
const custumFlash = require('./config/middleware');

//app.use(cors());
const chatServer=require('http').Server(app);
const ChatSockets=require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);

// parse application/json
//app.use(bodyParser.json());
// app.use(cookieParser.JSONCookies());
app.use(express.urlencoded());                                       ////to read post form data
app.use(cookieParser());


app.use(express.static(env.assets_path));
// make uploads path available to browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(logger(env.morgan.mode,env.morgan.options))
app.use(expressLayouts);                                                    ////////it should be before routes becaz it give layout to view and filename should be "layout.ejs"
 



// extract style ans scipt ftom subpages to layout.ejs
app.set('layout extractStyles',true);
//app.set('layout extractScripts', true);



///seup my view engine
app.set('view engine','ejs'); 

//app.set('views',path.join(__dirname,'views')); //  can also be used
app.set('views','./views');


app.use(session({
    name:'codial',
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({              ////////by using this you can't be sign out when server restarted
            mongooseConnection : db,
            autoRemove : 'disable'
    },
    function(err){
        console.log(err,'connect mongedb connection setup ok ')
    })
    
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);        /////////middleware created by me to set user for ejs


/////////// below both use for flash messege/////////////////
app.use(flash());
app.use(custumFlash.setFlash);
app.use('/',require('./routes'));                                           ///use middleware before running the server to access or use express router and  we go in index.js of routes

// now call the server by using "app.listen()"

app.listen(port,function(err){
    if(err){
        console.log('error to accessing port');
        return;
    }
    console.log('server is running perfectaly');
});

 