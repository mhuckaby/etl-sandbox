var Q = require('q');

exports.TimedRetry = function(retryCount, retriedFunction) {
    var deferred = Q.defer();

    if(!retriedFunction) {
        console.log("function to retry is undefined");
        deferred.reject("function to retry is undefined");
    }

    var counter = 0;

    var intervalId = setInterval(function() {
        counter += 1;

        if(counter > retryCount) {
            clearInterval(intervalId);

            console.log("exhausted retries");
            deferred.reject("exhausted retries");
        }

        retriedFunction(function() {
            clearInterval(intervalId);
        }, deferred);

    }, 1000);

    return deferred.promise;
};
