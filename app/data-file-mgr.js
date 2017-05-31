var fs = require('fs');

exports.readSqlFile = function(filename) {
    return fs.readFileSync(`sql/${filename}.sql`, 'utf-8');
};

exports.readCypherFile = function(filename) {
    return fs.readFileSync(`cypher/${filename}.cypher`, 'utf-8');
}
