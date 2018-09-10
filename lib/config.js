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
    'maxChecks': 5
};

environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecret': 'thisIsASecret',
    'maxChecks': 5


};


//  Determine whioch should be exported out based on command line argument
const curentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLoweCase() : '';


// chekc if the environment exist is not
const environmentToExport = typeof (environments[curentEnvironment]) == 'object' ? environments[curentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;