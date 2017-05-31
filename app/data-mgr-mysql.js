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

    var ddl = [
        'DROP TABLE IF EXISTS etls_activity',
        'DROP TABLE IF EXISTS etls_user;',


        'CREATE TABLE etls_user (id BIGINT NOT NULL AUTO_INCREMENT, uuid VARCHAR(36), username VARCHAR(20), PRIMARY KEY(id));',

        'INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Rick");',              // 1
        'INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Morty");',             // 2
        'INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Jerry");',             // 3
        'INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Beth");',              // 4
        'INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Summer");',            // 5
        'INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Mr. Meeseeks");',      // 6
        'INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Shrimply Pibbles");',  // 7


        'CREATE TABLE etls_activity (id BIGINT NOT NULL AUTO_INCREMENT, source_user BIGINT NOT NULL, target_user BIGINT, action VARCHAR(20) NOT NULL, PRIMARY KEY(id));',

        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (1, 2, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (1, 2, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (1, 3, "message");',

        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (2, 1, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (3, 1, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (4, 1, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (5, 1, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (6, 1, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (7, 1, "message");',

        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (4, 5, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (5, 6, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (6, 7, "message");',
        'INSERT INTO etls_activity (source_user, target_user, action) VALUES (7, 4, "message");',
    ];

    var promises = [];
    for(index in ddl) {
        promises.push( execute(connection, ddl[index]) );
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

