var logger = require('fancy-log');
var path = require('path');
var express = require('express');
var app = express();
var populateDataService = require('./data-populate-svc');
var socketCheck = require('./socket-check');
var Q = require('q');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var serviceStatus = {
    mySql: "not-available",
    neo4j: "not-available",
    elastic: "not-available"
};


const statusCheck = () => {

    return [
        socketCheck.tryHost('mysql', 3306, 5).then(function() {
            serviceStatus.mySql = "available";
        }),

        socketCheck.tryHost('neo4j', 7473, 5).then(function() {
            serviceStatus.neo4j = "available";
        }),

        socketCheck.tryHost('elasticsearch', 7473, 5).then(function() {
            serviceStatus.elastic = "available";
        })
    ];
};

app.get('/', function (req, res) {
    var scPromises = statusCheck();
    Q.allSettled(scPromises).then(function() {
        res.render('index', {
            title: 'ETLS',
            status: serviceStatus,
            host_rewrite: req.query.host_rewrite ? req.query.host_rewrite : 'localhost'
        });
    });

});

app.get('/data/init', function(req, res, next) {
    res.header('Content-Type', 'application/json');

    populateDataService.initializeData().then(function(resolve) {
        logger('resolved data init successfully');
        res.send(resolve.message());
    },function(reject) {
        logger('data init failed');
        if(reject.inProgress()) {
            logger('returning in progress failure message');
            res.status(429).send(reject.message());
        }else {
            logger('returning internal failure message');
            res.status(500).send(reject.message());
        }
    });

});

app.listen(3000);
