var mysql = require('mysql'); 
var util = require('util'); 
 
var pool  = mysql.createPool({ 
    connectionLimit : 10, 
    host     : 'db4free.net', 
    user     : 'rafacarol', 
    password : 'RafaCarol123456789', 
    database : 'travelcanvas' 
}); 
 
pool.query = util.promisify(pool.query);

module.exports = pool;