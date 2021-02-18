const mongoose = require('mongoose');

const TokenSchema=new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User_info'         //////// name of document in database which is defined in schema
    },
    accessToken:{
        type:String

    }
},{
    timestamps:true
});

const Token = mongoose.model('Token',TokenSchema);
module.exports = Token;