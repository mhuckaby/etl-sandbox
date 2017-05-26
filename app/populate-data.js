var populateMysql = require('./populate-data-mysql');
var Q = require('q');


var dataInitLock = false;

exports.isLocked = function() {
    return dataInitLock;
};

exports.Main = function() {
    var deferred = Q.defer();

    if(dataInitLock) {
        deferred.reject({"message":"IN_PROGRESS"});
    }else {
        dataInitLock = true;

        populateMysql.populatePromise().then(function() {
            deferred.resolve({"message":"OK"});
        }, function() {
            deferred.reject({"message":"FAILED"});
        }).done(function() {
            dataInitLock = false;
        });
    };
    return deferred.promise;
};