/**
 * Server related tasks
 * 
 */

//  Dependencies
var http = require("http");
var https = require("https")
var url = require("url");
var config = require("./config")
var stringDecoder = require("string_decoder").StringDecoder;
var fs = require("fs")
var handlers = require("./handlers");
var helpers = require("./helpers");
var path = require("path");


// Instantitate the server module object
var server = {};



// helpers.sendTwilioSms('9821616610', 'Hello!', function (err) {
//     if (err) {
//         console.log('this was the error', err)
//     } else {
//         console.log("success")
//     }
// });

/**
 * Initializing server
 */
server.httpServer = http.createServer((req, res) => {
    unifiedServer(req, res);
});



/**
 * Initializing server
 */
server.httpsServeroptions = {
    'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
    'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
}

server.httpsServer = https.createServer(server.httpsServeroptions, (req, res) => {
    server.unifiedServer(req, res);
});

//  All the server logic for both http and https server
server.unifiedServer = (req, res) => {
    // Get the URL and parse it

    const parsedUrl = url.parse(req.url, true);
    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");
    // Get query string as an object
    const queryStringObject = parsedUrl.query;
    // Get http method
    const method = req.method.toLowerCase();
    // Get headers as an object
    const headers = req.headers;
    // Get payload if any
    const decoder = new stringDecoder("utf-8");
    let buffer = "";
    req.on("data", data => {
        buffer += decoder.write(data);
    });
    req.on("end", () => {
        buffer += decoder.end();
        // Choose the hadnler this request should go to and one not found go to not found
        const chosenHandler = typeof (server.router[trimmedPath]) !== "undefined" ? server.router[trimmedPath] : handlers.notfound;
        // Construct the data object to send to handl;er
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };
        // Route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {
            //  Use status code callbacked by handler or default to 200
            statusCode = typeof statusCode == "number" ? statusCode : 200;
            // Use pauyload called by handler or default to empty object
            payload = typeof payload == "object" ? payload : {};
            // Convert to string
            const payloadString = JSON.stringify(payload);
            // Return the response
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log("Request Headers is received on this paload: ", payloadString, statusCode);
        });
    });
}



server.router = {
    ping: handlers.ping,
    users: handlers.users,
    tokens: handlers.tokens,
    checks: handlers.checks
};


server.init = function () {
    /**
     * Start the server 
     */
    server.httpServer.listen(config.httpPort, () => {
        console.log("The server is listening on port " + config.httpPort);
    });

    /**
     * Start the server 
     */
    server.httpsServer.listen(config.httpsPort, () => {
        console.log("The server is listening on port " + config.httpsPort);
    });


}


module.exports = server;