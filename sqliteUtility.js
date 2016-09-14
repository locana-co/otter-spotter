var sqlite3 = require('sqlite3').verbose();

//connect to local database
var db = new sqlite3.Database('./otterspotter.db');


////Perform INSERT operation.
//db.run("INSERT into test(id) VALUES (3)");

//create utility service
var sqliteUtility = {};

//function that performs a query
sqliteUtility.query = function(query, cb) {
    //Perform SELECT Operation
    db.all(query,function(err,rows){
        cb(rows);
    });

}

module.exports = sqliteUtility;