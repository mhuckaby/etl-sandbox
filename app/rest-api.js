var populateData = require('./populate-data');
var express = require('express');
var app = express();


app.get('/', function (req, res) {
    res.send('ELTS')
});

app.get('/data/init', function(req, res, next) {
    res.header("Content-Type", "application/json");

    if(populateData.isLocked()) {
        res.status(429).send({"message":"IN_PROGRESS"});
    }else {
        populateData.Main().then(function(value) {
            res.send(value);
        },function(value) {
            res.status(500).send(value);
        });
    };

});

app.listen(3000);
