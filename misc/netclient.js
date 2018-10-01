/**
 * This is an example TCP client
 * Connects to port 600 and send word ping
 */

//  Dependencies
var net = require('net');

// Defien the message to be send
var outboundMessage = 'ping';


// Create the client
var client = net.createConnection({
    'port': 6000
}, function () {
    // Send the message
    client.write(outboundMessage);
})

// When the server writes back, log what it says then kill the client
client.on('data', function (inboundMessage) {
    var messageString = inboundMessage.toString();
    console.log('I wrote ' + outboundMessage + ' and the said ' + messageString);
    client.end();
})