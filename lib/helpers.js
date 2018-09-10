/**
 * Helpers for various tasks
 */


//  Dependencies
const crypto = require('crypto');
const config = require('./config')

//   Container for various helpers

var helpers = {}

// To encrypt data and created using SHA256 hash
helpers.hash = str => {
    if (typeof (str) == 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
}


// To parse the JSON to an object without throwinfg an erro
helpers.parseJsonToObject = str => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
}


// helps to create a randopm strin
helpers.createRandomString = function (strLength) {
    strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false
    if (strLength) {
        //  define all possible characters that can go into the stinr
        var possibleChaharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

        // start the final string
        var str = '';

        for (i = 1; i <= strLength; i++) {
            var randomCharacter = possibleChaharacters.charAt(Math.floor(Math.random() * possibleChaharacters.length))
            str += randomCharacter;
        }
        return str;
    } else {
        return false;
    }
}



// Export helpers
module.exports = helpers;