/**
 * This is an example TLS Server
 * Creating a server listening on 6000
 */

//  Dependencies
var tls = require('tls');
var fs = require('fs');
var path = require('path');

// Server options
var options = {
    'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
    'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
}



// Create server
var server = tls.createServer(options, function (connection) {
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