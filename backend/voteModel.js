const mongoose = require("mongoose");
const voteSchema = new mongoose.Schema({
    monument:String,
    votes : {type:Number,default:0}
});
module.exports = mongoose.model("Vote",voteSchema);

