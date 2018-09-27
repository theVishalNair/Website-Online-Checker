/**
 * Test runner
 */

//  Overrude the NODE_ENV variable
process.env.NODE_ENV = 'testing';



// Application logic for the test runner
_app = {};

// Container for the tests
_app.tests = {};

_app.tests.unit = require('./unit');
_app.tests.api = require('./api')



// Count all the test
_app.countTests = function () {
    var counter = 0;
    for (var key in _app.tests) {
        if (_app.tests.hasOwnProperty(key)) {
            var subTests = _app.tests[key];
            for (var testName in subTests) {
                if (subTests.hasOwnProperty(testName)) {
                    counter++;
                }
            }
        }
    }
    return counter;
}


// Run all the tests, collecting the erros and successes
_app.runTests = function () {
    var errors = [];
    var successes = 0;
    var limit = _app.countTests();
    var counter = 0;
    for (var key in _app.tests) {
        if (_app.tests.hasOwnProperty(key)) {
            var subTests = _app.tests[key];
            for (var testName in subTests) {
                if (subTests.hasOwnProperty(testName)) {
                    (function () {
                        var tmpTestName = testName;
                        var testValue = subTests[testName];
                        // Call the test
                        try {
                            testValue(function () {
                                // If it call back without throwing then it succeded
                                console.log('\x1b[32m%s\x1b[0m', tmpTestName);
                                counter++;
                                successes++;
                                if (counter == limit) {
                                    _app.produceTestReport(limit, successes, errors);
                                }
                            })
                        } catch (e) {
                            // If it throws error, then it failed
                            errors.push({
                                'name': testName,
                                'error': e
                            })
                            console.log('\x1b[32m%s\x1b[0m', tmpTestName);
                            counter++;
                            if (counter == limit) {
                                _app.produceTestReport(limit, successes, errors);
                            }
                        }
                    })();
                }
            }
        }
    }
}


// Produce a test outcome report
_app.produceTestReport = function (limit, successes, errors) {
    console.log("");
    console.log("-----------------------Begin Test Report-------------------");
    console.log("");
    console.log("Total Tests ", limit);
    console.log("Pass ", successes);
    console.log("Fail ", errors.length);
    console.log("");
    if (errors.length > 0) {
        console.log("-----------------------Begin Error Details-------------------");

        console.log("")
        errors.forEach(function (testError) {
            console.log('\x1b[31m%s\x1b[0m', testError.name);
            console.log(testError.error);
            console.log("");
        })
        console.log("")

        console.log("-----------------------EndErrpr Details-------------------");

    }


    console.log("");
    console.log("-----------------------End Test Report-------------------");


    process.exit(0);

}


// Run the test
_app.runTests();