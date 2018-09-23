/**
 * Cli Relate dtask
 */


//  Dependenccies
var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
class _events extends events {};
var e = new _events();
var os = require('os');
var v8 = require('v8');
var _data = require('./data');
var _logs = require('./logs');
var helpers = require('./helpers')


// Instantiate the CLI module object

var cli = {};


// Input handlers
e.on('man', function (str) {
    cli.responders.help();
});

e.on('help', function (str) {
    cli.responders.help();
});

e.on('exit', function (str) {
    cli.responders.exit();
});

e.on('stats', function (str) {
    cli.responders.stats();
});

e.on('list users', function (str) {
    cli.responders.listUsers();
});

e.on('more user info', function (str) {
    cli.responders.moreUserInfo(str);
});


e.on('list checks', function (str) {
    cli.responders.listChecks(str);
});

e.on('more check info', function (str) {
    cli.responders.moreCheckInfo(str);
});

e.on('list logs', function (str) {
    cli.responders.listLogs();
});

e.on('more log info', function (str) {
    cli.responders.moreLogInfo(str);
});

// Responders
cli.responders = {};

// Vertical Space
cli.verticalSpace = function (lines) {
    lines = typeof (lines) == 'number' && lines > 0 ? lines : 1;
    for (var i = 0; i < lines; i++) {
        console.log('')
    }
};


// Create horizontal line
cli.horizontalLine = function () {
    // Get available screen size
    var width = process.stdout.columns;

    var line = '';
    for (var i = 0; i < width; i++) {
        line += '-';
    }
    console.log(line);

}


// Creat ecentered text on the screen
cli.centered = function (str) {
    str = typeof (str) == 'string' && str.trim().length > -1 ? str.trim() : '';
    // Get available screen size
    var width = process.stdout.columns;

    // Calculate left poadding there should be
    var leftPaddong = Math.floor((width - str.length) / 2);

    // Put in left padding spaces before strinf

    var line = '';
    for (var i = 0; i < leftPaddong; i++) {
        line += ' ';
    }
    line += str
    console.log(line);
}


// Help respoinders
cli.responders.help = function () {
    var commands = {
        'exit': 'Kill the CLI (and the rest of the application)',
        'man': 'Show this help page',
        'help': 'Alias of the "man" command',
        'stats': 'Get statistics on the underlying operating system and resources utilised',
        'list users': 'Show a list of all the registered (undeleted) users in the system',
        'more user info --{userId}': 'Details of a specific user',
        'list checks --up --down': 'List of all the active checks in the sytem, including their state. the --up and --down are both optional',
        'more check info --{checkId}': 'Show details of a specifeid check',
        'list logs': 'Show a list of all the log files available to be read (compressed)',
        'more log info --{fileName}': 'Show details of a specifed log files'

    }

    // Show a header for help page that is as wide as the screen
    cli.horizontalLine();
    cli.centered('CLI MANUAL');
    cli.horizontalLine();
    cli.verticalSpace(2);


    // Show each command followed by its explanation in white and yellow respectively
    for (var key in commands) {
        if (commands.hasOwnProperty(key)) {
            var value = commands[key];
            var line = '\x1b[34m' + key + '\x1b[0m';
            var padding = 60 - line.length;
            for (var i = 0; i < padding; i++) {
                line += ' ';
            }
            line += value;
            console.log(line);
            cli.verticalSpace();
        }
    }

    cli.verticalSpace(1);

    // End with another horizontal line
    cli.horizontalLine();
}


// Exit respoinders
cli.responders.exit = function () {
    process.exit(0);
}

// Stats respoinders
cli.responders.stats = function () {
    //    Compile an object of stats
    var stats = {
        'Load Average': os.loadavg().join(' '),
        'CPU Count': os.cpus().length,
        'Free Memory': os.freemem(),
        'Currently Malloced Memory': v8.getHeapStatistics().malloced_memory,
        'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
        'Allocated Heap Used (%)': Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapSpaceStatistics().total_heap_size) * 100),
        'Available Heap Allocated (%)': Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapSpaceStatistics().heap_size_limit) * 100),
        'Uptime': os.uptime() + ' seconds'
    };

    //  Show a header for stats page that is as wide as the screen
    cli.horizontalLine();
    cli.centered('SYSTEM STATISTICS');
    cli.horizontalLine();
    cli.verticalSpace(2);


    // LogOut each stats
    for (var key in stats) {
        if (stats.hasOwnProperty(key)) {
            var value = stats[key];
            var line = '\x1b[34m' + key + '\x1b[0m';
            var padding = 60 - line.length;
            for (var i = 0; i < padding; i++) {
                line += ' ';
            }
            line += value;
            console.log(line);
            cli.verticalSpace();
        }
    }

    cli.verticalSpace(1);

    // End with another horizontal line
    cli.horizontalLine();
}

// list users respoinders
cli.responders.listUsers = function () {
    _data.list('users', function (err, userIds) {
        if (!err && userIds && userIds.length > 0) {
            cli.verticalSpace();
            userIds.forEach(function (userId) {
                _data.read('users', userId, function (err, userData) {
                    if (!err && userData) {
                        var line = 'Name: ' + userData.firstName + ' ' + userData.lastName + ' Phone: ' + userData.phone + ' Checks: ';
                        var numberOfChecks = typeof (userData.checks) == 'object' && userData.checks instanceof Array && userData.checks.length > 0 ? userData.checks.length : 0;
                        line += numberOfChecks;
                        console.log(line);
                        cli.verticalSpace();
                    };
                });
            });
        }
    })
}

// more user info respoinders
cli.responders.moreUserInfo = function (str) {
    // Get ID from PropTypes.string
    var arr = str.split('--');
    var userId = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if (userId) {
        // Look up the user
        _data.read('users', userId, function (err, userData) {
            if (!err && userData) {
                delete userData.hashedPassword;

                cli.verticalSpace();
                console.dir(userData, {
                    'colors': true
                });
                cli.verticalSpace();
            };
        });
    }
}

// list Checks respoinders
cli.responders.listChecks = function (str) {
    _data.list('checks', function (err, checkIds) {
        if (!err && checkIds && checkIds.length > 0) {
            cli.verticalSpace();
            checkIds.forEach(function (checkId) {
                _data.read('checks', checkId, function (err, checkData) {
                    var includeCheck = false;
                    var lowerString = str.toLowerCase();
                    // Get the state , default to down
                    var state = typeof (checkData.state) == 'string' ? checkData.state : 'down';
                    // Get the state default to unknown
                    var stateOrUnknown = typeof (checkData.state) == 'string' ? checkData.state : 'unknown';
                    //  If the user has specifeid the state or hasmnt specified any state, include the 
                    if (lowerString.indexOf('--' + state) > -1 || (lowerString.indexOf('--up')) == -1 && (lowerString.indexOf('--down')) == -1) {
                        var line = 'ID: ' + checkData.id + ' ' + checkData.method.toUpperCase() + ' ' + checkData.protocol + '://' + checkData.url + ' State: ' + stateOrUnknown;
                        console.log(line);
                        cli.verticalSpace();
                    }
                })
            })
        }
    })
}

// more check info respoinders
cli.responders.moreCheckInfo = function (str) {
    // Get ID from string
    var arr = str.split('--');
    var checkId = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if (checkId) {
        // Look up the user
        _data.read('checks', checkId, function (err, checkData) {
            if (!err && checkData) {
                cli.verticalSpace();
                console.dir(checkData, {
                    'colors': true
                });
                cli.verticalSpace();
            };
        });
    }
}

// list logs respoinders
cli.responders.listLogs = function () {
    _logs.list(true, function (err, logFileNames) {
        console.log(!err && logFileNames && logFileNames.length > 0)
        if (!err && logFileNames && logFileNames.length > 0) {
            cli.verticalSpace();
            logFileNames.forEach(function (logFileName) {
                if (logFileName.indexOf('_') > -1) {
                    console.log(logFileName);
                    cli.verticalSpace();
                }
            })
        }
    })
}

// more log info respoinders
cli.responders.moreLogInfo = function (str) {
    // Get ID from string
    var arr = str.split('--');
    var logFileName = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if (logFileName) {

        cli.verticalSpace();
        // Decompress log file
        _logs.decompress(logFileName, function (err, strData) {
            if (!err && strData) {
                // Split into lines
                var arr = strData.split('\n');
                arr.forEach(function (jsonString) {
                    var logObject = helpers.parseJsonToObject(jsonString);
                    if (logObject && JSON.stringify(logObject) !== '{}') {
                        console.dir(logObject, {
                            'colors': true
                        });
                        cli.verticalSpace();
                    }
                })
            }
        })
    }
}



// Input processor 
cli.processInput = function (str) {
    str = typeof (str) == 'string' && str.trim().length > 0 ? str.trim() : false;
    // Only process the iunput if the user has written something
    if (str) {
        // Codify the unique string that the unique question users can ask
        var uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ];


        //    Go through possible input and emit an event when a match is found
        var matchFound = false;
        var counter = 0;
        uniqueInputs.some(function (input) {
            if (str.toLowerCase().indexOf(input) > -1) {
                matchFound = true;
                //   Emit an event matchinbg the unique input
                e.emit(input, str);
                return true;
            }
        });


        // If no match is found tell the user to try again
        if (!matchFound) {
            console.log('sorry try again');
        }


    }
}


// Init the script
cli.init = function () {
    // Send the message in darkblue in consone
    console.log('\x1b[34m%s\x1b[0m', "The cli is running");

    //  Startthe interface
    var _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });

    // Create an initial promp
    _interface.prompt();



    // Handle each  lineof input spearately

    _interface.on('line', function (str) {
        cli.processInput(str);


        // Reinitialize promp after
        _interface.prompt();

    });

    // If the user stops the CLI, kill the associated process
    _interface.on('close', function () {
        process.exit(0);
    })

};










// Export the module = cli
module.exports = cli