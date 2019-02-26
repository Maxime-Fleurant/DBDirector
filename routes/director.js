var   express         = require('express');
var   router          = express.Router();
var   async           = require("async");
const Schema_Director = require('../models/nedirecmodel');
const Schema_Movie    = require("../models/movieModel");
var   request         = require("request");
var   country         = {'en' : "English",'it' : "Italian",'fr' : "French",'de' : "German",'sv' : "Swedish",'es' : "Spanish",'da' : "Danish",'cs' : "Czech",'ja' : "Japanese",'ko' : "Korean",'cn' : "Chinese",'ru' : "Russian",'nl' : "Dutch",'pt' : "Portuguese",'el' : "Greek",'sr' : "Serbian",'zh' : "Chinese zh",'pl' : "Polish",'fa' : "Farsi",'ca' : "Catalan",'hi' : "Hindi",'fi' : "Finnish",'ar' : "Arabic",'th' : "Thai",'no' : "Norwegian",'hu' : "Hungarian",'he' : "Hebrew",'sk' : "Slovak",'ml' : "Malayalam",'te' : "Telugu",'ta' : "Tamil",'tr' : "Turkish",'af' : "Afrikaans",'is' : "Icelandic",'ro' : "Romanian",'hr' : "Croatian",'xx' : "unknown",'bn' : "Bengali",'lt' : "Lithuanian",'nb' : "Norwegian 2",'id' : "Indonesian",'kn' : "Kannada",'la' : "Latin",'et' : "Estonian",'bs' : "Bosnian",'ms' : "Malay",'mk' : "Macedonian",'sl' : "Slovenian",'tl' : "Tagalog",'vi' : "Vietnamese",'mr' : "Marathi",'uz' : "Uzbek",'uk' : "Ukrainian",'ka' : "Georgian",'ku' : "Kurdish",'sq' : "Albanian",'ky' : "Kyrgyz",'lv' : "Latvian",'pa' : "Punjabi",'bg' : "Bulgarian",'ur' : "Urdu",'si' : "Sinhalese",'eu' : "Basque",'kk' : "Kazakh",'ne' : "Nepali",'gu' : "Gujarati",'bm' : "Bambara",'sh' : "Serbo-Croatian	",'mn' : "Mongolian",'az' : "Azerbaijani",'hy' : "Armenian",'ab' : "Abkhazian",'km' : "Khmer",'cr' : "Cree",'am' : "Amharic",'qu' : "Quechua",'gl' : "Galician",'sw' : "Swahili",'my' : "Burmese",'bo' : "Tibetan",'lo' : "Lao",'fo' : "Faroese",'lb' : "Luxembourgish",'as' : "Assamese"};
var   years           = [1950, 1960, 1970, 1980, 1990, 2000, 2010];


router.get('/', function(req, res, next) {
    
    Schema_Director.findOne({id : req.query.director}, (err, director) => {

        let movies = [];

        async.eachOf(director.movie, (elem, key, callback) => {
            
            Schema_Movie.findOne({id : elem}, (err, foundMovie) => {

                if (err || !foundMovie) {

                    request({
                        url : `https://api.themoviedb.org/3/movie/${elem}?api_key=89c4da8874a09af916c967e4c2a1f342&language=en-US`,
                        json: true
                    },(err, res, body)=>{

                        if (err || !res || res.statusCode != 200 || !body ) {
            
                            console.log("----");
                            console.log("something went wrong");
            
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

                            movies.push(body);

                            return callback();
                                    
                        }
            
                    });

                } else {

                    console.log("a")
                    
                    movies.push(foundMovie);
                    
                    return callback();

                }

            });

        }, (err) => {

            console.log(director.id);

            movies = movies.sort((a, b) => b.popularity - a.popularity );

            res.render('director', {
                title   : 'Director DB',
                director: director,
                movies  : movies,
                years   : years,
                langs   : country
            });

        });

    });
   
});

module.exports = router;