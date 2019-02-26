var mongoose = require("mongoose");

var directSchema = new mongoose.Schema({
    original_title      : String,
    title               : String,
    release_date        : Date,
    plot                : String,
    updated             : {type : Boolean, default : false},
    budget              : Number,
    genre               : String,
    homepage            : String,
    id                  : Number,
    poster_path         : String,
    production_companies: String,
    overview            : String,
    popularity          : Number,
    runtime             : Number,
    revenue             : Number,
    backdrop_path       : String
});

module.exports = mongoose.model("movie", directSchema);
