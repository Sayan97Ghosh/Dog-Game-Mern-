const mongoose=require("mongoose");

const likeSchema=mongoose.Schema({
    userid:String,
    email:String,
    time:String,
    image1:String,
    stat1:String,
    image2:String,
    stat2:String,
    
})

// favdb

const Likemodel=mongoose.model("favdb4",likeSchema);

module.exports={Likemodel}