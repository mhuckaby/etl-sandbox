var logger = require('fancy-log');
var dataMgrMySql = require('./data-mgr-mysql');
var dataMgrNeo4j = require('./data-mgr-neo4j');
var Q = require('q');


var dataInitLock = false;

var InitializeDataResult = function(failed, inProgress, message) {
    return {
        'inProgress': function() {
            return inProgress;
        }, 'failed': function() {
            return failed;
        }, 'message': function() {
            return message;
        }
    };
};

exports.isLocked = function() {
    return dataInitLock;
};

var initializeData = function() {
    var deferred = Q.defer();

    if(dataInitLock) {
        logger('lock is lit - not starting data init');
        deferred.reject( new InitializeDataResult(true, true, {'message':'IN_PROGRESS'}) );
    }else {
        logger('data init lock lit');
        dataInitLock = true;

        var result = {
            message: 'OK',
            result: {}
        };

        dataMgrMySql.populate().then(function() {
            logger('populated mysql');
            result.result['mysql'] = true;

            dataMgrNeo4j.populate().then(function() {
                logger('populated neo4j');
                result.result['neo4j'] = true;
                deferred.resolve( new InitializeDataResult(false, false, result) );
            }, function() {
                logger('failed to populate neo4j');
                result.result['neo4j'] = false;
                result.log.append('failed to populate neo4j');
                deferred.reject( new InitializeDataResult(true, false, result) );
            });

        }, function() {
            logger('failed to populate mysql');
            result.result['mysql'] = false;
            result.message = 'FAILED';
            deferred.reject( new InitializeDataResult(true, false, result) );
        }).done(function() {
            logger('data init lock released');
            dataInitLock = false;
        });
    };

    return deferred.promise;
};
exports.initializeData = initializeData;