/**
 * Primary file for the API
 */


//  Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');
var exampleDebuggignProblem = require('./lib/exampleDebuggingProblem')


// Declare the app
var app = {};

// Init function
app.init = function () {
    // Start the server
    debugger;
    server.init();
    debugger;

    // Start the workers
    workers.init();
    debugger;


    // Start the CLI to make sure it starts last
    setTimeout(function () {
        cli.init();
    }, 50);
    debugger;


    var foo = 1;
    console.log("Just assigned 1 to foo")
    debugger;

    foo++
    console.log("Incremented foo")
    debugger;

    foo = foo * foo;
    console.log("Multiplied foo")

    debugger;

    foo = foo.toString();
    console.log("convberted foo")

    debugger;

    exampleDebuggignProblem.init()
    console.log("Just called library foo")

    debugger;

}


// Execute
app.init();


// Export the app
module.exports = app;