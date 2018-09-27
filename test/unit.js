/**
 * This are unit test
 */


// Dependencies
var helpers = require('./../lib/helpers');
var assert = require('assert');
var logs = require('./../lib/logs');
var exampleDebuggingProblem = require('./../lib/exampleDebuggingProblem')



// Holder for test
var unit = {}

// Assert that getANumber should returning a number
unit['helpers.getANumber should return a number'] = function (done) {
    var val = helpers.getAnumber();
    assert.equal(typeof (val), 'number');
    done();
}

// Assert that getANumber should returning a number
unit['helpers.getANumber should return 1'] = function (done) {
    var val = helpers.getAnumber();
    assert.equal(val, 1);
    done();
}

// Assert that getANumber should returning a number
unit['helpers.getANumber should return 2'] = function (done) {
    var val = helpers.getAnumber();
    assert.equal(val, 2);
    done();
}


// Loogs .list should call back an array and false error
unit['logs.list should callback false as error and return us an array'] = function (done) {
    logs.list(true, function (err, logFileNames) {
        assert.equal(err, false);
        assert.ok(logFileNames instanceof Array);
        assert.ok(logFileNames.length > 0);
        done();
    });
};



// logs.truncate should not throw error if log id doesn ot exist
unit['logs.truncate should not throw error if log id does not exist'] = function (done) {
    assert.doesNotThrow(function () {
        logs.truncate('I do not exist', function (err) {
            assert.ok(err);
            done();
        });
    }, TypeError);
}


// exampleDebuggingProblem.init should not throw error (but it does)
unit['exampleDebuggingProblem.init should not throw error when called'] = function (done) {
    assert.doesNotThrow(function () {
        exampleDebuggingProblem.init();
        done();
    }, TypeError);
}


module.exports = unit;