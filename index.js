/**
 * Primary file for the API
 */

/**
 * Dependencies
 */
const http = require("http");
const https = require("https")
const url = require("url");
const config = require("./lib/config")
const stringDecoder = require("string_decoder").StringDecoder;
const fs = require("fs")
const handlers = require("./lib/handlers");
const helpers = require("./lib/helpers")

/**
 * Initializing server
 */
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

/**
 * Start the server 
 */
httpServer.listen(config.httpPort, () => {
  console.log("The server is listening on port " + config.httpPort);
});


/**
 * Initializing server
 */
const httpsServeroptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
}

const httpsServer = https.createServer(httpsServeroptions, (req, res) => {
  unifiedServer(req, res);
});

/**
 * Start the server 
 */
httpsServer.listen(config.httpsPort, () => {
  console.log("The server is listening on port " + config.httpsPort);
});

//  All the server logic for both http and https server
const unifiedServer = (req, res) => {
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
    const chosenHandler = typeof router[trimmedPath] !== "undefined" ? router[trimmedPath] : handlers.notfound;
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



const router = {
  ping: handlers.ping,
  users: handlers.users,
  tokens: handlers.tokens,
  checks: handlers.checks
};