/**
 * This is an example TCP (net) Server
 * Creating a server listening on 6000
 */

//  Dependencies
var net = require('net');

// Create server
var server = net.createServer(function (connection) {
    // Send the word pong
    var outboundMessage = 'pong';
    connection.write(outboundMessage);

    // When the client writes something, log it out
    connection.on('data', function (inboundMessage) {
        var messageString = inboundMessage.toString();
        console.log('I wrote ' + outboundMessage + ' and the said ' + messageString);
    });
});

// Server listens
server.listen(6000);