var logger = require('fancy-log');
var mysql = require('mysql');
var Q = require('q');
var dataFileMgr = require('./data-file-mgr');


exports.populate = function() {
    var deferred = Q.defer();

    getMySqlConnection().then(function (connection) {
        ddlAndData(connection).then(function(resolve) {
            deferred.resolve(resolve);
        }, function(reject) {
            deferred.reject(reject);
        });
    }, function (reject) {
        logger(reject);
        deferred.reject(reject);
    });

    return deferred.promise.timeout(10000);
};

var getMySqlConnection = function() {
    var deferred = Q.defer();

    var connection = mysql.createConnection({
        host     : 'mysql',
        user     : 'etls_user',
        password : 'password',
        database : 'etls'
    });

    connection.connect(function(err) {
        if(err) {
            deferred.reject('failed to acquire connection');
        }else {
            deferred.resolve(connection);
        }
    });

    return deferred.promise;
};

var ddlAndData = function (connection) {
    var deferred = Q.defer();

    var execute = function(connection, statement) {
        var deferredExecution = Q.defer();

        connection.query(statement, function (error) {
            if (error) {
                deferred.reject(`mysql data init error: ${error}`);
                throw error;
            }
            logger(`executed: ${statement}`);
            deferredExecution.resolve(`executed: ${statement}`);
        });

        return deferredExecution.promise;
    };

    var ddlSql = dataFileMgr.readSqlFile('init-ddl-and-data');
    var ddl = dataFileMgr.getLines(ddlSql);

    var promises = [];
    for(index in ddl) {
        if(ddl[index]) {
            promises.push( execute(connection, ddl[index]) );
        }else {
           continue;
        }
    };

    Q.all(promises).then(function() {
        deferred.resolve('all statements executed');
    }, function() {
        deferred.reject('mysql data population error');
    }).done(function() {
        connection.end();
    });

    return deferred.promise;
};

exports.getActivityData = function() {
    var deferred = Q.defer();
    logger('getActivityData');

    getMySqlConnection().then(function(connection) {

        var statement = dataFileMgr.readSqlFile('get-activity-data');

        connection.query(statement, function (error, rows) {
            if (error) {
                deferred.reject(`activity query error: ${error}`);
                throw error;
            }

            logger(`executed: ${statement}, rows: ${rows.length}`);

            deferred.resolve(rows);

            connection.end();
        });

    });

    return deferred.promise;
};

