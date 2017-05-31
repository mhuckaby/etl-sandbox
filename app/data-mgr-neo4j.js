var dataFileMgr = require('./data-file-mgr');
var dataMgrMySql = require('./data-mgr-mysql');
var logger = require('fancy-log');
var neo4j = require('neo4j-driver').v1;
var Q = require('q');


var writeData = function(session, resultSet) {
    return session.writeTransaction(function(transaction) {
        var cypher = dataFileMgr.readCypherFile('merge-user-and-activity');
        logger(`writing neo4j data with cypher query:\n${cypher}`);

        for(r in resultSet) {

            var cypherParams = {
                source_user_id: resultSet[r].source_user_id,
                source_user_uuid: resultSet[r].source_user_uuid,
                source_username: resultSet[r].source_username,
                target_user_id: resultSet[r].target_user_id,
                target_user_uuid: resultSet[r].target_user_uuid,
                target_username: resultSet[r].target_username,
                activity_id: resultSet[r].activity_id,
                action: resultSet[r].action
            };

            transaction.run(cypher, cypherParams).then(function(resolve) {
                logger('cypher statement ran successfully.');
            }, function(reject) {
                logger(`cypher statement failed: ${ JSON.stringify(reject) }`);
            });
        };
    });
};

var deleteData = function(session) {
    return session.writeTransaction(function(transaction) {
        transaction.run('MATCH (n) DETACH DELETE n');
    });
};

var populate = function() {
    var deferred = Q.defer();
    var driver = neo4j.driver('bolt://neo4j', neo4j.auth.basic('', ''));
    var session = driver.session();

    logger('querying mysql for activity data');

    dataMgrMySql.getActivityData().then(function(resultSet) {
        logger(`mysql query complete`);

        deleteData(session).then(function() {
            logger('delete data done');

            writeData(session, resultSet).then(function() {
                driver.close();
                logger('neo4j done');
                deferred.resolve('neo4j done');
            }, function(reject) {
                driver.close();
                logger(`neo4j transaction failed: ${reject}`);
                deferred.reject(`neo4j transaction failed: ${reject}`);
            });

        }, function() {
            logger('delete data fail')
        });

    }, function() {
        logger('failed to read activity data from mysql');
        deferred.reject('failed to read activity data')
    });

    return deferred.promise.timeout(10000);
};

exports.populate = populate;