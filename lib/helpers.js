/**
 * Helpers for various tasks
 */


//  Dependencies
const crypto = require('crypto');
const config = require('./config');
const https = require('https')
const querystring = require('querystring');

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



// Export helpers
module.exports = helpers;