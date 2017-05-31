var logger = require('fancy-log');
var path = require('path');
var express = require('express');
var app = express();
var populateDataService = require('./data-populate-svc');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index', {
        title: 'ETLS',
        host_rewrite: req.query.host_rewrite ? req.query.host_rewrite : 'localhost'
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
