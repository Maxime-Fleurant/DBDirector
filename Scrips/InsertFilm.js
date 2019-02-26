var   arraymovie   = ("./movies.json");
var   fs           = require("fs");
var   Schema_movie = require("../models/movieModel");
const async        = require("async");
var   mongoose     = require("mongoose");
var   apikeyArray  = ["89c4da8874a09af916c967e4c2a1f342", "1bedf48dfa724561f28753249be19cea", "f905f8f8661df4d6b1a955027425704d", "3c156cd109454e79ca8ea679d90f51f4"];
var   proxy        = [null, "http://62.210.167.3:3128",  "http://51.254.124.179:3128", "http://51.77.147.98:3128", "http://51.15.68.179:3128", "http://212.83.181.23:54321", "http://51.77.148.201:3128"];
var   apiState     = 0;
var   count        = 0;
var   request      = require("request")

mongoose.connect('mongodb://localhost/movie');

function fsReadFileSynchToArray (filePath) {
    var data = JSON.parse(fs.readFileSync(filePath));
    return data;
}



var movies = fsReadFileSynchToArray(arraymovie);

movies = movies.filter((elem) => elem.adult == false && elem.video == false && elem.popularity < 1);

async.eachOfSeries(movies, (elem, key, callback) => {

    let newMovie = new Schema_movie({
        original_title: elem.original_title,
        id            : elem.id,
        Popularity    : elem.popularity,
    });

    newMovie.save((err, savedMovie) => {

        if (err) {
            console.log(err);
            return callback();
        }

        console.log(key);

        return callback();

    })

}, (err) => {

    console.log("done")

});



// async.eachOfLimit(movies, 150,(directorDoc, key, callback) => {

//     setTimeout(()=>{

//         var apikey = apikeyArray[key % 4];

//         request({
//             url : `https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
//             ` `https://api.themoviedb.org/3/person/${movie.id}?api_key=${apikey}&language=en-US`,
//             json: true,
//             proxy : proxy[key % 7]
//         },(err, res, body)=>{

//             if (err || !res || res.statusCode != 200 || !body ) {

//                 console.log("----");
//                 console.log("something went wrong");
//                 console.log(proxy[key % 7])

//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("no err")
//                 }

//                 if (res) {
//                     console.log(res.statusCode);
//                 } else {
//                     console.log("no res")
//                 }

//                 if (!body) {
//                     console.log("no body")
//                 }

//                 console.log("----");

//                 return callback();

//             } else { 

//                 count = count + 1;

//                 directorDoc.birthday = new Date(body.birthday);
//                 directorDoc.image    = body.profile_path;
//                 directorDoc.update1  = true;

//                 directorDoc.save((err, savedDirector) => {

//                     console.log("updated direct", count, directorList.length);

//                     return callback();

//                 });

//             }

//         })

//     }, 10000);

// });