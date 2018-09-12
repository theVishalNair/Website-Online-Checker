/**
 * Worker related tasks
 */

//  Dependencies
var path = require('path');
var fs = require('fs');
var _data = require('./data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var url = require('url');

/**
 * Instiantiate the worker onject
 */
var workers = {};


// Look up all check, get their data, send to a validator
workers.gatherAllchecks = function () {
    // Get all the checks
    _data.list('checks', function (err, checks) {
        if (!err && checks && checks.length > 0) {
            checks.forEach(function (check) {
                //  Read in the checked data
                _data.read('checks', check, function (err, originalCheckData) {
                    if (!err && originalCheckData) {
                        // Pass it to check validator, and ler that function continue
                        workers.validateCheckData(originalCheckData);
                    } else {
                        console.log(" Error reading one of check's data")
                    }
                })
            });
        } else {
            console.log("Error: Could not find any checks to process")
        }
    })
}

/**
 * sanity check data 
 */
workers.validateCheckData = function (originalCheckData) {
    originalCheckData = typeof (originalCheckData) == 'Object' && originalCheckData !== null ? originalCheckData : {};
    originalCheckData.id = typeof (originalCheckData.id) == 'string' && originalCheckData.id.trim().length == 20 ? originalCheckData.id.trim() : false;
    originalCheckData.userPhone = typeof (originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length == 20 ? originalCheckData.userPhone.trim() : false;
    originalCheckData.protocol = typeof (originalCheckData.protocol) == 'string' && ['https', 'http'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol : false;
    originalCheckData.url = typeof (originalCheckData.url) == 'string' && originalCheckData.url.trim().length > 0 ? originalCheckData.url.trim() : false;
    originalCheckData.method = typeof (originalCheckData.method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(originalCheckData.method) > -1 ? originalCheckData.method : false;
    originalCheckData.successCodes = typeof (originalCheckData.successCodes) == 'object' && originalCheckData.successCodes instanceof Array && originalCheckData.successCodes.length > 0 ? originalCheckData.successCodes : false;
    originalCheckData.timeoutSeconds = typeof originalCheckData.timeoutSeconds == "number" && originalCheckData.timeoutSeconds % 1 === 0 && originalCheckData.timeoutSeconds >= 1 && originalCheckData.timeoutSeconds <= 5 ? originalCheckData.timeoutSeconds : false;

    // Set the keys that may not be set if the workers have never seen the keys before
    originalCheckData.state = typeof (originalCheckData.state) == 'string' && ['up', 'down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';
    originalCheckData.lastChecked = typeof originalCheckData.lastChecked == "number" && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;

    //  If alll the checks pass pass the data back to next function
    if (originalCheckData.id &&
        originalCheckData.userPhone &&
        originalCheckData.protocol &&
        originalCheckData.url &&
        originalCheckData.method &&
        originalCheckData.successCodes &&
        originalCheckData.timeoutSeconds) {
        workers.performCheck(originalCheckData);
    } else {
        console.log("Errror: One of the chekc is not properly formatted, skipping it")
    }
}



/**
 * Timer to execute the workers - process once per minute
 */
workers.loop = function () {
    setInterval(function () {
        worker.gatherAllchecks();
    }, 1000 * 60);
}


/**
 * Init the script
 */
workers.init = function () {
    //  Execute all the checks immediately
    workers.gatherAllchecks();

    //  call the loop so the checks will execute later on
    workers.loop();
}


/**
 * Export the module
 */
module.exports = workers;