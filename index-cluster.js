/**
 * Primary file for the API
 */


//  Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');
var cluster = require('cluster');
var os = require('os');


// Declare the app
var app = {};

// Init function
app.init = function (callback) {

    if (cluster.isMaster) {
        // If we are  on the master threadStart the workers and cli

        // Start the workers
        workers.init();

        // Start the CLI to make sure it starts last
        setTimeout(function () {
            cli.init();
            callback();
        }, 50);
        //  Fork the processs
        for (var i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }
    } else {
        // If we are not on the master threadStart the server
        server.init();
    }

}


// Self invoking onlly if required directly
if (require.main == module) {
    app.init(function () {});
}


// Export the app
module.exports = app;