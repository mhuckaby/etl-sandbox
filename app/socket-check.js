var net = require('net');
var Q = require('q');

var tryHost = function(host, port, seconds) {
    if(seconds === undefined || seconds <= 0) {
        seconds = 15;
    };

    var deferredMain = Q.defer();
    var secondCounter = 0;

    var clientConnect = () => {
        var client = new net.Socket();

        client.on('error', function() {
            deferredMain.notify({ elapsed: {
                seconds: secondCounter
            }});
        });

        client.connect(port, host, function() {
            client.destroy();
            clearInterval(iid);
            deferredMain.resolve();
        });
    };

    clientConnect();

    var iid = setInterval(function() {
        clientConnect();

        if(seconds <= secondCounter) {
            clearInterval(iid);
            deferredMain.reject("timeout");
        }
        secondCounter ++;

    }, 1000);

    return deferredMain.promise;
};
exports.tryHost = tryHost;