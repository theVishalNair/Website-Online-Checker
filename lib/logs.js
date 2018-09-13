/**
 * Library for stroring and retriving logs
 */

//  Dependencies
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');

// container for the moidule
var lib = {}


/* Base directory of the log folder */
lib.baseDir = path.join(__dirname, '/../.logs/');


//  Append a string to a file, create file if it doesnot exist

lib.append = function (file, str, callback) {

    // Opening the file to append
    fs.open(lib.baseDir + file + '.log', 'a', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // Append to fiel and close it
            fs.appendFile(fileDescriptor, str + '\n', function (err) {
                if (!err) {
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback("An error occured while trying to close the file")
                        }
                    })
                } else {
                    callback("Error appending to the file")
                }
            })
        } else {
            callback("Couldnot open file for appending")
        }
    })

};


// List all the logs and optionally include compressed logs or not
lib.list = function (includeCompressedLogs, callback) {
    fs.readdir(lib.baseDir, function (err, data) {
        if (!err && data && data.length > 0) {
            var trimmedFileNames = [];
            data.forEach(function (fileName) {
                // Add the .log files
                if (fileName.indexOf('.log') > -1) {
                    trimmedFileNames.push(fileName.replace('.log', ''));
                }

                // add on the .gz files
                if (fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs) {
                    trimmedFileNames.push(fileName.replace('.gz.b64', ''));
                }
            });
            callback(false, trimmedFileNames);
        } else {
            callback(err, data)
        }
    })
}

// Compress the log files into .g.b64 file into same directory
lib.compress = function (logId, newFileId, callback) {
    var sourceFile = logId + '.log';
    var destFile = newFileId + '.gz.b64';


    // Read source file
    fs.readFile(lib.baseDir + sourceFile, 'utf-8', function (err, inputString) {
        if (!err && inputString) {
            //  compress the data using gzip
            zlib.gzip(inputString, function (err, buffer) {
                if (!err && buffer) {
                    // Send the compress data to destination file
                    fs.open(lib.baseDir + destFile, 'wx', function (err, fileDescriptor) {
                        if (!err && fileDescriptor) {
                            fs.writeFile(fileDescriptor, buffer.toString('base64', function (err) {
                                if (!err) {
                                    fs.close(fileDescriptor, function (err) {
                                        if (!err) {
                                            callback(false)
                                        } else {
                                            callback(err);
                                        }
                                    })
                                } else {
                                    callback(err)
                                }
                            }))
                        } else {
                            callback(err);
                        }
                    })
                } else {
                    callback(err);
                }
            })
        } else {
            callback(err);
        }
    })
}

// DeCompress the log files
lib.decompress = function (fileId, callback) {
    var fileName = fileId + '.gz.b64';
    fs.readFile(lib.baseDir + fileName, 'utf-8', function (err, str) {
        if (!err && str) {
            // Decompress thed data
            var inputBuffer = Buffer.from(str, 'base64');
            glib.unzip(inputBuffer, function (err, outputBuffer) {
                if (!err && outputBuffer) {
                    // Callback
                    var str = outputBuffer.toString();
                    callback(false, str);
                } else {
                    callback(err);
                }
            })
        } else {
            callback(err);
        }
    })
}

// To truncate the log
lib.truncate = function (logId, callback) {
    fs.truncate(lib.baseDir + logId + '.log', 0, function (err) {
        if (!err) {
            callback(false);
        } else {
            callback(err);
        }
    })
}







// Export the module
module.exports = lib;