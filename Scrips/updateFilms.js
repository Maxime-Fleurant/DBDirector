var   arraymovie   = ("./movies.json");
var   fs           = require("fs");
var   Schema_movie = require("../models/movieModel");
const async        = require("async");
var   mongoose     = require("mongoose");
var   apikeyArray  = ["89c4da8874a09af916c967e4c2a1f342", "1bedf48dfa724561f28753249be19cea", "f905f8f8661df4d6b1a955027425704d", "3c156cd109454e79ca8ea679d90f51f4"];
var   proxy        = [null, "http://62.210.167.3:3128",  "http://51.254.124.179:3128", "http://51.77.147.98:3128", "http://51.15.68.179:3128", "http://37.59.129.93:47387", "http://51.77.148.201:3128"];
var   apiState     = 0;
var   count        = 0;
var   request      = require("request")

mongoose.connect('mongodb://localhost/movie');



Schema_movie.find({updated : false}, (err, movieList) => {

    console.log(movieList.length);

    async.eachOfLimit(movieList, 150,(movie, key, callback) => {

        setTimeout(()=>{
    
            var apikey = apikeyArray[key % 4];
    
            request({
                url : `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apikey}&language=en-US
                `,
                json: true,
                proxy : proxy[key % 7]
            },(err, res, body)=>{
    
                if (err || !res || res.statusCode != 200 || !body ) {
    
                    console.log("-- --");
                    console.log("something went wrong");
                    console.log(proxy[key % 7])
    
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("no err");
                    }
    
                    if (res) {
                        console.log(res.statusCode);
                    } else {
                        console.log("no res");
                    }
    
                    if (!body) {
                        console.log("no body");
                    }
    
                    console.log("----");
    
                    return callback();
    
                } else { 

                    movie.original_title       = body.original_title;
                    movie.title                = body.title;
                    movie.release_date         = body.release_date;
                    movie.overview             = body.overview;
                    movie.updated              = true;
                    movie.budget               = body.budget;
                    movie.genre                = body.genre;
                    movie.homepage             = body.homepage;
                    movie.id                   = body.id;
                    movie.poster_path          = body.poster_path;
                    movie.production_companies = body.production_companies;
                    movie.overview             = body.overview;
                    movie.popularity           = body.popularity;
                    movie.runtime              = body.runtime;
                    movie.revenue              = body.revenue;
                    movie.backdrop_path        = body.backdrop_path;

                    movie.save((err, savedMovie) => {

                        if (err) {
                            return callback();
                        }

                        console.log("Updated", key);

                        return callback();

                    });

                    
    
                }
    
            });
    
        }, 10000);
    
    });

});


