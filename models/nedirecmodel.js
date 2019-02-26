var mongoose = require("mongoose");

var directSchema = new mongoose.Schema({
    name       : String,
    movie      : Array,
    id         : Number,
    birthday   : Date,
    image      : String,
    update1    : {type : Boolean, default : false},
    update2    : {type : Boolean, default : false},
    update3    : {type : Boolean, default : false},
    ratingarray: Array,
    datearray  : Array,
    langarray  : Array,
    ratingAvg  : Number,
    dateAvg    : Date,
    dateAvg2   : Date,
    mainLang   : String,
    seen       : Boolean
});

module.exports = mongoose.model("director2", directSchema);
