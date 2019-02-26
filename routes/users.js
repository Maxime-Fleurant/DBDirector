var   express         = require('express');
var   router          = express.Router();
const Schema_Director = require('../models/nedirecmodel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
    let id = req.query.id;

    Schema_Director.findOne({id : id}, (err, director) => {

      director.seen = true;

      director.save((err, saved) => {
        console.log("fmdlmfdlmfdlmfl")
        return res.render('close');
      })

    });

   

});

module.exports = router;
