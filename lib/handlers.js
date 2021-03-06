/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require("./data");
var helpers = require("./helpers");
var config = require("./config");
var _url = require('url');
var dns = require('dns');
var _performance = require('perf_hooks').performance;
var util = require('util');
var debug = util.debuglog('performance');

// Define all the handlers
var handlers = {};

/**
 * 
 * HTML Handlers
 * 
 */

// Index Handlers
handlers.index = function (data, callback) {
  // Reject any request that isnt a GET
  if (data.method == 'get') {
    // prepare data for interpolation
    var templateData = {
      'head.title': "Uptime Monitoring - Made Simple",
      'head.description': "We offer free, simple uptime monitoring for HTTP/HTTPS site, so that when your site goes down you will know.",
      "body.class": "index"
    }



    // Read in a template as a stinf
    helpers.getTemplate('index', templateData, function (err, str) {
      if (!err && str) {
        // Add universal header function
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })

  } else {
    callback(405, undefined, 'html')

  }

}


// create account
handlers.accountCreate = function (data, callback) {
  if (data.method == 'get') {
    // prepare data for interpolation
    var templateData = {
      'head.title': "Create an Account",
      'head.description': "Sign Up is easy and only take few seconds",
      "body.class": "accountCreate"
    }



    // Read in a template as a stinf
    helpers.getTemplate('accountCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add universal header function
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })

  } else {
    callback(405, undefined, 'html')

  }
}


// create new session
handlers.sessionCreate = function (data, callback) {
  if (data.method == 'get') {
    // prepare data for interpolation
    var templateData = {
      'head.title': "Login to your account",
      'head.description': "Please enter phone number and password to access your account",
      "body.class": "sessionCreate"
    }



    // Read in a template as a stinf
    helpers.getTemplate('sessionCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add universal header function
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })

  } else {
    callback(405, undefined, 'html')

  }
}

//  Session has been deleted
handlers.sessionDeleted = function (data, callback) {
  if (data.method == 'get') {
    // prepare data for interpolation
    var templateData = {
      'head.title': "Logged Out",
      'head.description': "You have been logged out of your account",
      "body.class": "sessionDeleted"
    }



    // Read in a template as a stinf
    helpers.getTemplate('sessionDeleted', templateData, function (err, str) {
      if (!err && str) {
        // Add universal header function
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })

  } else {
    callback(405, undefined, 'html')

  }
}


// Edit your account 
handlers.accountEdit = function (data, callback) {
  if (data.method == 'get') {
    // prepare data for interpolation
    var templateData = {
      'head.title': "Account Settings",
      "body.class": "accountEdit"
    }



    // Read in a template as a stinf
    helpers.getTemplate('accountEdit', templateData, function (err, str) {
      if (!err && str) {
        // Add universal header function
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })


  } else {
    callback(405, undefined, 'html')

  }
}

//  Account has been deleted
handlers.accountDeleted = function (data, callback) {
  if (data.method == 'get') {
    // prepare data for interpolation
    var templateData = {
      'head.title': "Account Deleted",
      'head.description': "You account has been deleted",
      "body.class": "accountDeleted"
    }



    // Read in a template as a stinf
    helpers.getTemplate('accountDeleted', templateData, function (err, str) {
      if (!err && str) {
        // Add universal header function
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })

  } else {
    callback(405, undefined, 'html')

  }
}

//  Create a new check
handlers.checksCreate = function (data, callback) {
  if (data.method == 'get') {
    // prepare data for interpolation
    var templateData = {
      'head.title': "Create a new check",
      "body.class": "checksCreate"
    }



    // Read in a template as a stinf
    helpers.getTemplate('checksCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add universal header function
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })

  } else {
    callback(405, undefined, 'html')

  }
}

//  Dashboard - View all checks
handlers.checksList = function (data, callback) {
  if (data.method == 'get') {
    // prepare data for interpolation
    var templateData = {
      'head.title': "Dashboard",
      "body.class": "checksList"
    }



    // Read in a template as a stinf
    helpers.getTemplate('checksList', templateData, function (err, str) {
      if (!err && str) {
        // Add universal header function
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })

  } else {
    callback(405, undefined, 'html')

  }
}

//  Edit a check
handlers.checksEdit = function (data, callback) {
  if (data.method == 'get') {
    // prepare data for interpolation
    var templateData = {
      'head.title': "Check Details",
      "body.class": "checksEdit"
    }



    // Read in a template as a stinf
    helpers.getTemplate('checksEdit', templateData, function (err, str) {
      if (!err && str) {
        // Add universal header function
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html')
          }
        })
      } else {
        callback(500, undefined, 'html')
      }
    })

  } else {
    callback(405, undefined, 'html')

  }
}

// Favicion
handlers.favicon = function (data, callback) {
  if (data.method == 'get') {
    // Read in the favicon's data
    helpers.getStaticAssest('favicon.ico', function (err, data) {
      if (!err && data) {
        // callback the data
        callback(200, data, 'favicon');
      } else {
        callback(500);
      }
    })
  } else {
    callback(405);
  }
};


//  Public Assets
handlers.public = function (data, callback) {
  // Request any method that is not a get
  if (data.method == 'get') {
    // get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
    if (trimmedAssetName.length > 0) {
      // Read in assets data
      helpers.getStaticAssest(trimmedAssetName, function (err, data) {
        if (!err && data) {
          // Determine content type (default to plain text)
          var contentType = 'plain';

          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }
          if (trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }
          if (trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpg';
          }
          if (trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'ico';
          }

          callback(200, data, contentType);
        } else {
          callback(404);
        }
      })
    } else {
      callback(404)
    }
  } else {
    callback(405)
  }
}


/**
 * JSon API handlers
 * 
 */

// Ping
handlers.ping = function (data, callback) {
  callback(200);
};

// Not-Found
handlers.notFound = function (data, callback) {
  callback(404);
};

// Example Error
handlers.exampleError = function (data, callback) {
  var err = new Error('This is an example error');
  throw (err);
}

// Users
handlers.users = function (data, callback) {
  var acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function (data, callback) {
  // Check that all required fields are filled out
  var firstName =
    typeof (data.payload.firstName) == "string" &&
    data.payload.firstName.trim().length > 0 ?
    data.payload.firstName.trim() :
    false;
  var lastName =
    typeof (data.payload.lastName) == "string" &&
    data.payload.lastName.trim().length > 0 ?
    data.payload.lastName.trim() :
    false;
  var phone =
    typeof (data.payload.phone) == "string" &&
    data.payload.phone.trim().length == 10 ?
    data.payload.phone.trim() :
    false;
  var password =
    typeof (data.payload.password) == "string" &&
    data.payload.password.trim().length > 0 ?
    data.payload.password.trim() :
    false;
  var tosAgreement =
    typeof (data.payload.tosAgreement) == "boolean" &&
    data.payload.tosAgreement == true ?
    true :
    false;
  console.log(firstName, lastName, phone, password, tosAgreement);
  if (firstName && lastName && phone && password && tosAgreement) {
    // Make sure the user doesnt already exist
    _data.read("users", phone, function (err, data) {
      if (err) {
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if (hashedPassword) {
          var userObject = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            hashedPassword: hashedPassword,
            tosAgreement: true
          };

          // Store the user
          _data.create("users", phone, userObject, function (err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, {
                Error: "Could not create the new user"
              });
            }
          });
        } else {
          callback(500, {
            Error: "Could not hash the user's password."
          });
        }
      } else {
        // User alread exists
        callback(400, {
          Error: "A user with that phone number already exists"
        });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required fields"
    });
  }
};

// Required data: phone
// Optional data: none
// @TODO Only let an authenticated user access their object. Dont let them access anyone elses.
handlers._users.get = function (data, callback) {
  // Check that phone number is valid
  var phone =
    typeof (data.queryStringObject.phone) == "string" &&
    data.queryStringObject.phone.trim().length == 10 ?
    data.queryStringObject.phone.trim() :
    false;
  if (phone) {
    // Get the token from headers
    var token =
      typeof (data.headers.token) == "string" ? data.headers.token : false;

    //  Verify that the given token is valid for phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        // Lookup the user
        _data.read("users", phone, function (err, data) {
          if (!err && data) {
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403, {
          Error: "Missing required token in header"
        });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required field"
    });
  }
};

// Required data: phone
// Optional data: firstName, lastName, password (at least one must be specified)
// @TODO Only let an authenticated user up their object. Dont let them access update elses.
handlers._users.put = function (data, callback) {
  // Check for required field
  var phone =
    typeof (data.payload.phone) == "string" &&
    data.payload.phone.trim().length == 10 ?
    data.payload.phone.trim() :
    false;
  //    Check optional fields
  var firstName =
    typeof (data.payload.firstName) == "string" &&
    data.payload.firstName.trim().length > 0 ?
    data.payload.firstName.trim() :
    false;
  var lastName =
    typeof (data.payload.lastName) == "string" &&
    data.payload.lastName.trim().length > 0 ?
    data.payload.lastName.trim() :
    false;
  var password =
    typeof (data.payload.password) == "string" &&
    data.payload.password.trim().length > 0 ?
    data.payload.password.trim() :
    false;

  //  Error if the phone is invalid
  if (phone) {
    // Get the token from headers
    var token =
      typeof (data.headers.token) == "string" ? data.headers.token : false;

    if (firstName || lastName || password) {
      handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
        if (tokenIsValid) {
          // Lookup for the user
          _data.read("users", phone, function (err, userData) {
            if (!err && userData) {
              // \Update filds
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }

              // Store the new updates
              _data.update("users", phone, userData, function (err) {
                if (!err) {
                  callback(200);
                } else {
                  console.log(err);
                  callback(500, {
                    Error: "Couldnot Update User"
                  });
                }
              });
            } else {
              callback(400, {
                Error: "User does not exist"
              });
            }
          });
        } else {
          callback(403, {
            Error: "Missing required token in header"
          });
        }
      });
    } else {
      callback(400, {
        Error: "Missing required field"
      });
    }
  } else {
    callback(400, {
      Error: "Missing required phone field"
    });
  }
};

// users delete
// Required field: phone
// @TODO only letr uathenticated user delete
handlers._users.delete = function (data, callback) {
  // Check if phone number is valid

  // Check that phone number is valid
  var phone =
    typeof (data.queryStringObject.phone) == "string" &&
    data.queryStringObject.phone.trim().length == 10 ?
    data.queryStringObject.phone.trim() :
    false;
  if (phone) {
    var token =
      typeof (data.headers.token) == "string" ? data.headers.token : false;

    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        // Lookup the user
        _data.read("users", phone, function (err, userData) {
          if (!err && userData) {
            _data.delete("users", phone, function (err) {
              if (!err) {
                var userChecks =
                  typeof (userData.checks) == "object" &&
                  userData.checks instanceof Array ?
                  userData.checks : [];
                var checkstoDelete = userChecks.length;
                if (checkstoDelete > 0) {
                  var checksDeleted = 0;
                  var deletionErrors = false;
                  userChecks.forEach(function (checkId) {
                    // delete the check
                    _data.delete('checks', checkId, function (err) {
                      if (err) {
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if (checksDeleted == checkstoDelete) {
                        if (!deletionErrors) {
                          callback(200);
                        } else {
                          callback(500, {
                            Error: 'Erros encountered during the deletion process'
                          })
                        }
                      }
                    })
                  })
                } else {
                  callback(200);
                }
              } else {
                callback(500, {
                  Error: "Could not Delete the User"
                });
              }
            });
          } else {
            callback(400, {
              Error: "Cannot find specified user"
            });
          }
        });
      } else {
        callback(403, {
          Error: "Missing required token in header"
        });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required field"
    });
  }
};

// Tokens
handlers.tokens = function (data, callback) {
  var acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for tokens
handlers._tokens = {};

/**
 * Function Post - token
 * @param {phone, passwword} data Used to create and set a token
 * @param {function} callback Function that should execute on callbakc issues
 */
handlers._tokens.post = function (data, callback) {
  _performance.mark('entered function');
  var phone =
    typeof (data.payload.phone) == "string" &&
    data.payload.phone.trim().length == 10 ?
    data.payload.phone.trim() :
    false;
  var password =
    typeof (data.payload.password) == "string" &&
    data.payload.password.trim().length > 0 ?
    data.payload.password.trim() :
    false;
  _performance.mark('inputs validated')
  if (phone && password) {
    //  Look up the user who matches that phone number
    _performance.mark('beginning user look up')
    _data.read("users", phone, function (err, userData) {
      _performance.mark('completed user look up')

      if (!err && userData) {
        // Hash the sent password and co,pare it to the stored password in user object
        _performance.mark('beginnig password hashing')

        var hashedPassword = helpers.hash(password);
        _performance.mark('password hashing complete')

        if (hashedPassword == userData.hashedPassword) {
          //  if valid create a new tokjen with a random name and set expiration to 1  hour in the future
          _performance.mark('creating data for token')

          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          console.log(expires);
          var tokenObject = {
            phone: phone,
            id: tokenId,
            expires: expires
          };
          _performance.mark('Beginning storing token')




          // store the token

          _data.create("tokens", tokenId, tokenObject, function (err, data) {
            _performance.mark('Storing token complete')

            // Gather all measurement
            _performance.measure('Beginning to end', 'entered function', 'Storing token complete');
            _performance.measure('Validating user Input', 'entered function', 'inputs validated');
            _performance.measure('User Lookup', 'entered function', 'beginning user look up', 'completed user look up');
            _performance.measure('Token Data creation', 'creating data for token', 'Beginning storing token', 'Storing token complete');

            // Log out all measurements
            var measurements = _performance.getEntriesByType('measure');
            measurements.forEach(element => {
              console.log('\x1b[34m%s\x1b[0m', element.name + ' ' + element.duration)

            });
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, {
                Error: "Unable to create token"
              });
            }
          });
        } else {
          callback(400, {
            Error: "Password did not match"
          });
        }
      } else {
        callback(400, {
          Error: "Could not find specifeid user"
        });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required fields"
    });
    1;
  }
};

// handlers post
// required data id
//  optional data none
handlers._tokens.get = function (data, callback) {
  var id =
    typeof (data.queryStringObject.id) == "string" &&
    data.queryStringObject.id.trim().length == 20 ?
    data.queryStringObject.id.trim() :
    false;
  if (id) {
    // Lookup the user
    _data.read("tokens", id, function (err, tokenData) {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, {
      Error: "Missing required field"
    });
  }
};

// Tokens put
//  required dat : id, extend
// optional data : none
handlers._tokens.put = function (data, callback) {
  var id =
    typeof (data.payload.id) == "string" && data.payload.id.trim().length == 20 ?
    data.payload.id.trim() :
    false;

  var extend =
    typeof (data.payload.extend) == "boolean" && data.payload.extend == true ?
    data.payload.extend :
    false;

  if (id && extend) {
    //   Lookup token
    _data.read("tokens", id, function (err, tokenData) {
      if (!err && tokenData) {
        //  check if token isnt already expiored
        if (tokenData.expires > Date.now()) {
          // Set token expiring time
          tokenData.expires = Date.now() + 100 * 60 * 60;
          //    stores the new update
          _data.update("tokens", id, tokenData, function (err) {
            if (!err) {
              callback(200);
            } else {
              callback(500, {
                Error: "Server error"
              });
            }
          });
        } else {
          callback(400, {
            Error: "Session already expired"
          });
        }
      } else {
        callback(400, {
          Error: "Token does not exist"
        });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required fields or fields are invalid"
    });
  }
};

// handlers delete
//  Required dat id
//  optional dat none
handlers._tokens.delete = function (data, callback) {
  var id =
    typeof (data.queryStringObject.id) == "string" &&
    data.queryStringObject.id.trim().length == 20 ?
    data.queryStringObject.id.trim() :
    false;
  if (id) {
    // Lookup the user
    _data.read("tokens", id, function (err, data) {
      if (!err && data) {
        _data.delete("tokens", id, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, {
              Error: "Could not Delete the Tokens"
            });
          }
        });
      } else {
        callback(400, {
          Error: "Cannot find specified tokens"
        });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required field"
    });
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function (id, phone, callback) {
  // Lookup the token
  _data.read("tokens", id, function (err, tokenData) {
    if (!err && tokenData) {
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Checks
handlers.checks = function (data, callback) {
  var acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._checks[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for checks
handlers._checks = {};

// Checks - post
// Required data: protocol, url, method, successCodes, timeoutSeconds
//  optional data: none
handlers._checks.post = function (data, callback) {
  // validate inputs
  var protocol =
    typeof (data.payload.protocol) == "string" && ["https", "http"].indexOf(data.payload.protocol) > -1 ?
    data.payload.protocol :
    false;

  var url =
    typeof (data.payload.url) == "string" && data.payload.url.trim().length > 0 ?
    data.payload.url.trim() :
    false;

  var method =
    typeof (data.payload.method) == "string" && ["get", "put", "post", "delete"].indexOf(data.payload.method) > -1 ?
    data.payload.method :
    false;

  var successCodes =
    typeof (data.payload.successCodes) == "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0 ?
    data.payload.successCodes :
    false;

  var timeoutSeconds =
    typeof (data.payload.timeoutSeconds) == "number" &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5 ?
    data.payload.timeoutSeconds :
    false;


  if ((protocol && url && method && successCodes && timeoutSeconds)) {
    //  Get token from headers
    var token =
      typeof (data.headers.token) == "string" ? data.headers.token : false;
    // lookup the user by reading the token
    _data.read("tokens", token, function (err, tokenData) {
      if (!err && tokenData) {
        var userPhone = tokenData.phone;

        // Lookup user data
        _data.read("users", userPhone, function (err, userData) {
          if (!err && userData) {
            var userChecks =
              typeof (userData.checks) == "object" &&
              userData.checks instanceof Array ?
              userData.checks : [];
            if (userChecks.length < config.maxChecks) {
              // Verify that the url given has DNSA entries and therefore can resolve
              var parsedUrl = _url.parse(protocol + '://' + url, true);
              var hostname = typeof (parsedUrl.hostname) == 'string' && parsedUrl.hostname.length > 0 ? parsedUrl.hostname : false;
              dns.resolve(hostname, function (err, records) {
                if (!err && records) {
                  //  Create a random id for the check
                  var checkId = helpers.createRandomString(20);

                  // Create the check object, and include the user phone
                  var checkObject = {
                    id: checkId,
                    userPhone: userPhone,
                    protocol: protocol,
                    url: url,
                    method: method,
                    successCodes: successCodes,
                    timeoutSeconds: timeoutSeconds
                  };

                  //  Store the object
                  _data.create("checks", checkId, checkObject, function (err) {
                    if (!err) {
                      //  Add check id to the users object
                      userData.checks = userChecks;
                      userData.checks.push(checkId);

                      //  save the new user data
                      _data.update("users", userPhone, userData, function (err) {
                        if (!err) {
                          // Return the data about the new check
                          callback(200, checkObject);
                        } else {
                          callback(500, {
                            Error: "Could not update user with new check"
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        Error: "Could not create check"
                      });
                    }
                  });
                } else {
                  callback(400, {
                    'Error': 'The hostname of given URl did not resolve to any DNS entries'
                  })
                }
              })

            } else {
              callback(400, {
                Error: "User has reached max limit (" +
                  config.maxChecks +
                  "), Please some other checks"
              });
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400, {
      Error: "Missing required inputs or inputs are invalid"
    });
  }
};


// Checks -get
// Required dat: id
// optional data: none
handlers._checks.get = function (data, callback) {
  // Check that phone id is valid
  var id =
    typeof (data.queryStringObject.id) == "string" &&
    data.queryStringObject.id.trim().length == 20 ?
    data.queryStringObject.id.trim() :
    false;
  if (id) {

    // Lookup the check
    _data.read('checks', id, function (err, checkData) {
      if (!err && checkData) {
        // Get the token from headers
        var token =
          typeof (data.headers.token) == "string" ? data.headers.token : false;

        //  Verify that the given token is valid for id number
        handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
          if (tokenIsValid) {
            // Return the checkData
            callback(200, checkData)
          } else {
            callback(403);
          }
        });
      } else {
        callback(404)
      }
    })


  } else {
    callback(400, {
      Error: "Missing required field"
    });
  }
}

// Checks put
// Required data: id
// optional data: url, mewthod, protocol, successCodes, timeoutSeconds one must be sent

handlers._checks.put = function (data, callback) {
  // Check for required field
  var id =
    typeof (data.payload.id) == "string" &&
    data.payload.id.trim().length == 20 ?
    data.payload.id.trim() :
    false;
  //    Check optional fields
  // validate inputs
  var protocol =
    typeof (data.payload.protocol) == "string" && ["https", "http"].indexOf(data.payload.protocol) > -1 ?
    data.payload.protocol :
    false;

  var url =
    typeof (data.payload.url) == "string" && data.payload.url.trim().length > 0 ?
    data.payload.url.trim() :
    false;

  var method =
    typeof (data.payload.method) == "string" && ["get", "put", "post", "delete"].indexOf(data.payload.method) > -1 ?
    data.payload.method :
    false;

  var successCodes =
    typeof (data.payload.successCodes) == "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0 ?
    data.payload.successCodes :
    false;

  var timeoutSeconds =
    typeof (data.payload.timeoutSeconds) == "number" &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5 ?
    data.payload.timeoutSeconds :
    false;

  //  Error if the id exist
  if (id) {
    //  Check to see if one of toptional data is present
    if (protocol || url || method || successCodes || timeoutSeconds) {
      _data.read('checks', id, function (err, checkData) {
        if (!err && checkData) {
          var token =
            typeof (data.headers.token) == "string" ? data.headers.token : false;

          //  Verify that the given token is valid for id number
          handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
            if (tokenIsValid) {
              // update the checkData
              if (protocol) {
                checkData.protocol = protocol;
              }
              if (url) {
                checkData.url = url;
              }
              if (method) {
                checkData.method = method;
              }
              if (successCodes) {
                checkData.successCodes = successCodes;
              }
              if (timeoutSeconds) {
                checkData.timeoutSeconds = timeoutSeconds;
              }
              //  Store the update
              _data.update('checks', id, checkData, function (err) {
                if (!err) {
                  callback(200, checkData);
                } else {
                  callback(500, {
                    'Error': 'Could not update the data'
                  });
                }
              })

            } else {
              callback(403);
            }
          });
        } else {
          callback(400, {
            'Error': 'Check ID does not exist'
          })
        }
      })
    } else {
      callback(400, {
        'Error': 'Missing filed to update'
      })
    }
  } else {
    callback(400, {
      'Error': 'Missing required Fields'
    })
  }

}


// checks - delete
// Required data: id
//  optional data : none
handlers._checks.delete = function (data, callback) {
  var id =
    typeof (data.queryStringObject.id) == "string" &&
    data.queryStringObject.id.trim().length == 20 ?
    data.queryStringObject.id.trim() :
    false;
  if (id) {
    // Lookup the user
    _data.read("checks", id, function (err, checkData) {
      if (!err && checkData) {


        var token =
          typeof (data.headers.token) == "string" ? data.headers.token : false;

        //  Verify that the given token is valid for id number
        handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
          if (tokenIsValid) {
            _data.delete("checks", id, function (err) {
              if (!err) {
                _data.read("users", checkData.userPhone, function (err, userData) {
                  if (!err && userData) {

                    var userChecks =
                      typeof (userData.checks) == "object" &&
                      userData.checks instanceof Array ?
                      userData.checks : [];

                    // Remove the delete check ffrom their list of checks
                    var checkPosition = userChecks.indexOf(id);

                    if (checkPosition > -1) {
                      userChecks.splice(checkPosition, 1);
                      // Resave use object
                      _data.update("users", checkData.userPhone, userData, function (err) {
                        if (!err) {
                          callback(200);
                        } else {
                          callback(500, {
                            Error: "Could not find  the User"
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        Error: 'could not find the check on the user'
                      })
                    }

                  } else {
                    callback(400, {
                      Error: "Cannot find specified user"
                    });
                  }
                });
              } else {
                callback(500, {
                  Error: "Could not Delete the checks"
                });
              }
            });
          } else {
            callback(403, {
              Error: 'Invalid token'
            });
          }
        });
      } else {
        callback(400, {
          Error: "Cannot find specified checks"
        });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required field"
    });
  }
}

// Export the handlers
module.exports = handlers;