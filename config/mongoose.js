const mongoose = require('mongoose');
const env=require('../config/enviroment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',console.log.bind(console,'error connecting to mongodb'));
db.once('open',function(){
    console.log('successfully connect to database');
});


module.exports = db;