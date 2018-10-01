/**
 * This is an example UDP Client
 * Sending a message to server on port 6000
 */


//  Dependencies
var dgram = require('dgram');

// Create the client
var client = dgram.createSocket('udp4');

// Define the message and pull into a buffer
var messageString = 'This is a message';
var messageBuffer = Buffer.from(messageString);


// Senjd off the message
client.send(messageBuffer, 6000, 'localhost', function (err) {
    client.close();
});