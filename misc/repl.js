/**
 * Example REPL server
 * Take in the word fizz and log out buzz
 */

//  Dependencies
var repl = require('repl');

//  Start the repl

repl.start({
    'prompt': '>',
    'eval': function (str) {
        // Evaulation function for incoming inputs
        console.log("We are at ", str);


        // If the user said "fizz", say "buzz" backl to them
        if (str.indexOf('fizz') > -1) {
            console.log('buzz')
        }
    }
});