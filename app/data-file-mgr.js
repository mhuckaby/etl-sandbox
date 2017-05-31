var fs = require('fs');
var os = require('os');


var readSqlFile = function(filename) {
    return fs.readFileSync(`sql/${filename}.sql`, 'utf-8');
};

var getLines = function(val) {
    return val.split(os.EOL);
};

var readCypherFile = function(filename) {
    return fs.readFileSync(`cypher/${filename}.cypher`, 'utf-8');
};

exports.getLines = getLines;
exports.readCypherFile = readCypherFile;
exports.readSqlFile = readSqlFile;
