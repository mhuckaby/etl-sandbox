var path = require('path');
var express = require('express');
var app = express();
var populateDataService = require('./populate-data-svc');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index', { title: 'ETLS'});
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

app.listen(3001);
