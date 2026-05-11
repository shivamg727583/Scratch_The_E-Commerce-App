const mongoose= require('mongoose');
const debug =require('debug')("development:mongoose");

const config=require('config');


mongoose.connect(`${config.get("MONGODB_URI")}/scatch`).then(function(){
    debug("connected to database");
}
).catch(function(error){
    debug("error in connecting to database",error);
})



 module.exports = mongoose.connection;