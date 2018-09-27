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
var util = require('util');
var debug = util.debuglog('server');


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
    server.unifiedServer(req, res);
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
server.unifiedServer = function (req, res) {
    // Get the URL and parse it

    var parsedUrl = url.parse(req.url, true);
    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // Get query string as an object
    var queryStringObject = parsedUrl.query;
    // Get http method
    var method = req.method.toLowerCase();
    // Get headers as an object
    var headers = req.headers;
    // Get payload if any
    var decoder = new stringDecoder("utf-8");
    let buffer = "";
    req.on("data", data => {
        buffer += decoder.write(data);
    });
    req.on("end", () => {
        buffer += decoder.end();
        // Choose the hadnler this request should go to and one not found go to not found
        var chosenHandler = typeof (server.router[trimmedPath]) !== "undefined" ? server.router[trimmedPath] : handlers.notFound;
        console.log(chosenHandler, typeof (server.router[trimmedPath]))
        // If the request is within the public directory use to the public handler instead
        chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;


        // varruct the data object to send to handl;er
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };

        // Route the request to the handler specified in the router
        try {
            chosenHandler(data, function (statusCode, payload, contentType) {
                server.processHandlerResponse(res, method, trimmedPath, statusCode, payload, contentType);
            });
        } catch (e) {
            debug(e);
            server.processHandlerResponse(res, method, trimmedPath, 500, {
                'Error': 'An unknown error has occured'
            }, 'json')
        }
    });
}


// Process the response from the handler
server.processHandlerResponse = function (res, method, trimmedPath, statusCode, payload, contentType) {
    // Determine the type of response(fallback json)
    contentType = typeof (contentType) == 'string' ? contentType : 'json';

    //  Use status code callbacked by handler or default to 200
    statusCode = typeof (statusCode) == "number" ? statusCode : 200;


    // Return the response parts that are content specific
    var payloadString = '';
    if (contentType == 'json') {
        res.setHeader("Content-Type", "application/json");
        // Use pauyload called by handler or default to empty object
        payload = typeof (payload) == "object" ? payload : {};
        // Convert to string
        payloadString = JSON.stringify(payload);


    }
    if (contentType == 'html') {
        res.setHeader("Content-Type", "text/html");
        payloadString = typeof (payload) == 'string' ? payload : '';

    }
    if (contentType == 'favicon') {
        res.setHeader("Content-Type", "image/x-icon");
        payloadString = typeof (payload) !== 'undefined' ? payload : '';

    }
    if (contentType == 'css') {
        res.setHeader("Content-Type", "text/css");
        payloadString = typeof (payload) !== 'undefined' ? payload : '';

    }
    if (contentType == 'png') {
        res.setHeader("Content-Type", "image/png");
        payloadString = typeof (payload) !== 'undefined' ? payload : '';

    }
    if (contentType == 'jpg') {
        res.setHeader("Content-Type", "image/jpeg");
        payloadString = typeof (payload) !== 'undefined' ? payload : '';

    }
    if (contentType == 'plain') {
        res.setHeader("Content-Type", "text/plain");
        payloadString = typeof (payload) !== 'undefined' ? payload : '';

    }



    // Return the response-parts that are common to all
    res.writeHead(statusCode);
    res.end(payloadString);
    console.log("Request Headers is received on this paload: ", payloadString, statusCode);
}



server.router = {
    '': handlers.index,
    'account/create': handlers.accountCreate,
    'account/edit': handlers.accountEdit,
    'account/deletd': handlers.accountDeleted,
    'session/create': handlers.sessionCreate,
    'session/deleted': handlers.sessionDeleted,
    'checks/all': handlers.checksList,
    'checks/create': handlers.checksCreate,
    'checks/edit': handlers.checksEdit,
    'ping': handlers.ping,
    'api/users': handlers.users,
    'api/tokens': handlers.tokens,
    'api/checks': handlers.checks,
    'index': handlers.index,
    'favicon.ico': handlers.favicon,
    'public': handlers.public,
    'examples/errors': handlers.exampleError,
};


server.init = function () {
    /**
     * Start the server 
     */
    server.httpServer.listen(config.httpPort, () => {
        console.log('\x1b[36m%s\x1b[0m', "The server is listening on port " + config.httpPort)
    });

    /**
     * Start the server 
     */
    server.httpsServer.listen(config.httpsPort, () => {
        console.log('\x1b[35m%s\x1b[0m', "The server is listening on port " + config.httpsPort)
    });
};


module.exports = server;