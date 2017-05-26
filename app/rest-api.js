var express = require('express');
var app = express();
var populateDataService = require('./populate-data-svc');


app.get('/', function (req, res) {
    res.send('ELTS')
});

app.get('/data/init', function(req, res, next) {
    res.header('Content-Type', 'application/json');

    populateDataService.initializeData().then(function(resolve) {
        res.send(resolve.message());
    },function(reject) {
        if(reject.inProgress()) {
            res.status(429).send(reject.message());
        }else {
            res.status(500).send(reject.message());
        }
    });

});

app.listen(3000);
