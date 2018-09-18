/**
 * Helpers for various tasks
 */


//  Dependencies
const crypto = require('crypto');
const config = require('./config');
const https = require('https')
const querystring = require('querystring');
var path = require('path');
var fs = require('fs')

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


helpers.sendTwilioSms = function (phone, msg, callback) {
    phone = typeof (phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
    msg = typeof (msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 10 ? msg.trim() : false;

    if (phone && msg) {
        var payload = {
            'from': config.twilio.fromPhone,
            'To': '+1' + phone,
            'Body': msg
        };


        // Stringify payload
        var stringPayload = querystring.stringify(payload);

        //  Configure the request deltails
        var requestDetails = {
            'protocol': 'https:',
            'hostname': 'api.twilio.com',
            'method': 'POST',
            'path': '/2010-04-01/Accounts/' + config.twilio.accountSid + '/Messages.json',
            'auth': config.twilio.accountSid + ':' + config.twilio.authToken,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(stringPayload)
            }
        }


        //    Instatiatae the request object 
        var req = https.request(requestDetails, function (res) {
            // Grab the status of sent request
            var status = res.statusCode;
            // Callback successfully if the report went through
            if (status == 200 || status == 201) {
                callback(false)
            } else {
                callback('status code returned was ' + status)
            }
        });

        // Bind to error event so that it doesnt get thrown
        req.on('error', function (err) {
            callback(err);
        });

        // Add the payload
        req.write(stringPayload);

        //  End the request
        req.end();
    } else {
        callback('Given parameters were missing or invalid')
    }

}


/**
 * Finds out which template needs to be calles
 * @param {string} templateName contains the name of the template that needs to be sent back
 * @param {function} callback function that would be called on the end of execution
 */
helpers.getTemplate = function (templateName, data, callback) {
    templateName = typeof (templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof (data) == 'object' && data !== null ? data : {};

    if (templateName) {
        var templateDir = path.join(__dirname, '/../templates/');
        fs.readFile(templateDir + templateName + '.html', 'utf-8', function (err, str) {
            if (!err && str && str.length > 0) {
                //  do interpolate on the string
                var finalString = helpers.interpolate(str, data)
                callback(false, finalString)
            } else {
                callback("no template could be found");
            }
        })
    } else {
        console.log('A valid template name was not specifiec');
    }

};

// Add the universal header and footer and pass the data object 
helpers.addUniversalTemplates = function (str, data, callback) {
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data !== null ? data : {};

    //   get the header
    helpers.getTemplate('_header', data, function (err, headerString) {
        if (!err && headerString) {
            //  Get the footer
            helpers.getTemplate('_footer', data, function (err, footerString) {
                if (!err && headerString) {
                    var fullString = headerString + str + footerString;
                    callback(false, fullString);
                } else {
                    callback('Could not find the footer template')
                }
            })
        } else {
            callback('Could not find the header template')
        }
    })
}


//  take a given string and a data object and findReplace all the keys within it
helpers.interpolate = function (str, data) {
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data !== null ? data : {};

    // Add the templateGlobals do the data object, prepending the key name with "global" 
    for (var keyName in config.templateGlobals) {
        if (config.templateGlobals.hasOwnProperty(keyName)) {
            data['global.' + keyName] = config.templateGlobals[keyName];
        }
    }

    // for each key in the data object, insert its value into the string at the corresponding object
    for (var key in data) {
        if (data.hasOwnProperty(key) && typeof (data[key]) == 'string') {
            var replace = data[key];
            var find = '{' + key + '}';
            str = str.replace(find, replace);
        }
    }
    return str;
}


// Export helpers
module.exports = helpers;