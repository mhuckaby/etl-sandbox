var Q = require("q");

exports.TimedRetry = function(retryCount, retriedFunction) {
    var deferred = Q.defer();

    if(!retriedFunction) {
        console.log("function to retry is undefined");
        return {};
    }

    var counter = 0;

    var intervalId = setInterval(function() {
        counter += 1;

        if(counter > retryCount) {
            console.log("exhausted retries");

            clearInterval(intervalId);

            return;
        }

        retriedFunction(function() {
            clearInterval(intervalId);
        }, deferred);

    }, 1000);

    return deferred.promise;
};
