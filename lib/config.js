/**
 * Create and export configuration variables
 */

//  container for all environments
let environments = {};

//  Staging {default} environment

environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging',
    'hashingSecret': 'thisIsASecret',
    'maxChecks': 5,
    'twilio': {
        'accountSid': 'ACb32d411ad7fe886aac54c665d25e5c5d',
        'authToken': '9455e3eb3109edc12e3d8c92768f7a67',
        'fromPhone': '+15005550006'
    },
    'templateGlobals': {
        'appName': 'UptimeChecker',
        'companyName': 'Vishal Nair',
        'yearCreated': '2018',
        'baseUrl': 'http//localhost:3000'
    }
};

environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecret': 'thisIsASecret',
    'maxChecks': 5,
    'twilio': {
        'accountSid': 'ACb32d411ad7fe886aac54c665d25e5c5d',
        'authToken': '9455e3eb3109edc12e3d8c92768f7a67',
        'fromPhone': '+15005550006'
    },
    'templateGlobals': {
        'appName': 'UptimeChecker',
        'companyName': 'Vishal Nair',
        'yearCreated': '2018',
        'baseUrl': 'http//localhost:5000'
    }

};


// Testing environment
environments.testing = {
    'httpPort': 4000,
    'httpsPort': 4001,
    'envName': 'testing',
    'hashingSecret': 'thisIsASecret',
    'maxChecks': 5,
    'twilio': {
        'accountSid': 'ACb32d411ad7fe886aac54c665d25e5c5d',
        'authToken': '9455e3eb3109edc12e3d8c92768f7a67',
        'fromPhone': '+15005550006'
    },
    'templateGlobals': {
        'appName': 'UptimeChecker',
        'companyName': 'Vishal Nair',
        'yearCreated': '2018',
        'baseUrl': 'http//localhost:5000'
    }

};


//  Determine whioch should be exported out based on command line argument
const curentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';


// chekc if the environment exist is not
const environmentToExport = typeof (environments[curentEnvironment]) == 'object' ? environments[curentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;