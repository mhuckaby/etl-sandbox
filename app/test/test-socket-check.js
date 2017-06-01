var assert = require('assert');
var socketCheck = require('../socket-check');


describe('SocketCheck', function() {

    describe('#should attempt to connect to host for specified time', function() {

        it('rejects if time runs out', function(done) {
            this.timeout(5000);

            socketCheck.tryHost('127.0.0.1', 9999, 1).then(function() {
                assert.fail("should not have connected");
                done();
            }, function() {
                done();
            });
        });

        it('resolves if it connects', function(done) {
            this.timeout(5000);
            var exec = require('child_process').exec;

            exec('nc -t -l 0.0.0.0 9998', { timeout: 3000});

                socketCheck.tryHost('127.0.0.1', 9998, 1).then(function() {

                done();
            }, function() {
                assert.fail("should not have rejected");
                done();
            });
        });

    });
});