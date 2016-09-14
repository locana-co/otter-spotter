var express = require('express');
var router = express.Router();
var sqliteUtility = require('../sqliteUtility');

//example route
router.get('/points', function(req, res, next) {
    //query to pass
    var query = 'Select * from dummy_lat_lng;';

    sqliteUtility.query(query, function(response) {
        //when get response, send 200 status and return all of the data
        res.status(200).json(response);
    });


});



module.exports = router;