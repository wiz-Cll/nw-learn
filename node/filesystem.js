var fs = require('fs');

function showRoot( callback ){
    fs.readdir('/', function( err, files ){
        callback(files);
    });
}