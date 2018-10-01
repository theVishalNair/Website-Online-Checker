/**
 * This is an example TCP client
 * Connects to port 600 and send word ping
 */

//  Dependencies
var tls = require('tls');
var fs = require('fs');
var path = require('path');


// Server options
// Only required because we are using a self signed certificate
var options = {
    'ca': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
}

// Defien the message to be send
var outboundMessage = 'ping';


// Create the client
var client = tls.connect(6000, options, function () {
    // Send the message
    client.write(outboundMessage);
})

// When the server writes back, log what it says then kill the client
client.on('data', function (inboundMessage) {
    var messageString = inboundMessage.toString();
    console.log('I wrote ' + outboundMessage + ' and the said ' + messageString);
    client.end();
})