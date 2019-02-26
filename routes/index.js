var express = require('express');
var router = express.Router();
var country = {'en' : "English",'it' : "Italian",'fr' : "French",'de' : "German",'sv' : "Swedish",'es' : "Spanish",'da' : "Danish",'cs' : "Czech",'ja' : "Japanese",'ko' : "Korean",'cn' : "Chinese",'ru' : "Russian",'nl' : "Dutch",'pt' : "Portuguese",'el' : "Greek",'sr' : "Serbian",'zh' : "Chinese zh",'pl' : "Polish",'fa' : "Farsi",'ca' : "Catalan",'hi' : "Hindi",'fi' : "Finnish",'ar' : "Arabic",'th' : "Thai",'no' : "Norwegian",'hu' : "Hungarian",'he' : "Hebrew",'sk' : "Slovak",'ml' : "Malayalam",'te' : "Telugu",'ta' : "Tamil",'tr' : "Turkish",'af' : "Afrikaans",'is' : "Icelandic",'ro' : "Romanian",'hr' : "Croatian",'xx' : "unknown",'bn' : "Bengali",'lt' : "Lithuanian",'nb' : "Norwegian 2",'id' : "Indonesian",'kn' : "Kannada",'la' : "Latin",'et' : "Estonian",'bs' : "Bosnian",'ms' : "Malay",'mk' : "Macedonian",'sl' : "Slovenian",'tl' : "Tagalog",'vi' : "Vietnamese",'mr' : "Marathi",'uz' : "Uzbek",'uk' : "Ukrainian",'ka' : "Georgian",'ku' : "Kurdish",'sq' : "Albanian",'ky' : "Kyrgyz",'lv' : "Latvian",'pa' : "Punjabi",'bg' : "Bulgarian",'ur' : "Urdu",'si' : "Sinhalese",'eu' : "Basque",'kk' : "Kazakh",'ne' : "Nepali",'gu' : "Gujarati",'bm' : "Bambara",'sh' : "Serbo-Croatian	",'mn' : "Mongolian",'az' : "Azerbaijani",'hy' : "Armenian",'ab' : "Abkhazian",'km' : "Khmer",'cr' : "Cree",'am' : "Amharic",'qu' : "Quechua",'gl' : "Galician",'sw' : "Swahili",'my' : "Burmese",'bo' : "Tibetan",'lo' : "Lao",'fo' : "Faroese",'lb' : "Luxembourgish",'as' : "Assamese" }

var years = [1950, 1960, 1970, 1980, 1990, 2000, 2010]

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Director DB',
        langs : country,
        years : years
    });
});

module.exports = router;
