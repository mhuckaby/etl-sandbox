var logger = require('fancy-log');
var populateMysql = require('./populate-data-mgr-mysql');
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

exports.initializeData = function() {
    var deferred = Q.defer();

    if(dataInitLock) {
        logger('lock is lit - not starting data init');
        deferred.reject( new InitializeDataResult(true, true, {'message':'IN_PROGRESS'}) );
    }else {
        logger('data init lock lit');
        dataInitLock = true;

        populateMysql.populate().then(function() {
            logger('populated mysql');
            deferred.resolve( new InitializeDataResult(false, false, {'message':'OK'}) );
        }, function() {
            logger('failed to populate mysql');
            deferred.reject( new InitializeDataResult(true, false, {'message':'FAILED'}) );
        }).done(function() {
            logger('data init lock released');
            dataInitLock = false;
        });
    };

    return deferred.promise;
};