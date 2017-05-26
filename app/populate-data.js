var TimedRetry = require("./timed-retry").TimedRetry;
var MySqlDataPopulation = require("./populate-data-mysql");

var waitForMySqlHost = 60 * 4;


TimedRetry(waitForMySqlHost, MySqlDataPopulation.AttemptConnection).then(function(connection) {
    MySqlDataPopulation.CreateTablesAndData(connection);
}, function(value) {
    console.log("Waited  for mySql host for " + waitForMySqlHost + " without success");
});