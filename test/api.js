/**
 * API test
 */




// Dependencies
var app = require('./../index');
var assert = require('assert');
var http = require('http');
var config = require('./../lib/config');


// Holder for thr test
var api = {};


// Helpersd
var helpers = {};
helpers.makeGetRequest = function (path, callback) {
    // Configure the request details
    var requestDetails = {
        'protocol': 'http:',
        'hostname': 'localhost',
        'port': config.httpPort,
        'method': 'GET',
        'path': path,
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    // Send the request
    var req = http.request(requestDetails, function (res) {
        callback(res);
    });
    req.end();
};

// The main init() function should be able to run without throwing an erro
api['app.init should start without throwing'] = function (done) {
    assert.doesNotThrow(function () {
        app.init(function (err) {
            done();
        });

    }, TypeError);
};


// Make a request to /ping
api['/ping should respomd to GET with 200'] = function (done) {
    helpers.makeGetRequest('/ping', function (res) {
        assert.equal(res.statusCode, 200);
    })
}


// Make a request to /users
api['/api/users should respomd to GET with 400'] = function (done) {
    helpers.makeGetRequest('/api/users', function (res) {
        assert.equal(res.statusCode, 400);
    })
}


// Random Path
api['Random Path should respomd to GET with 404'] = function (done) {
    helpers.makeGetRequest('/this/path/shouldnt/exist', function (res) {
        assert.equal(res.statusCode, 404);
    })
}





// Export the test
module.exports = api;