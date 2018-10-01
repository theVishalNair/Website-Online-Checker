/**
 * Async Hook Example
 */

//  Dependencies
var async_hooks = require('async_hooks');
var fs = require('fs');


// Target execution context
var targetExecutionContext = false;


// Write an arbitary async function
var whatTImeIsIt = function (callback) {
    setInterval(function () {
        fs.writeSync(1, 'When the set interval runs, the execution contect is ' + async_hooks.executionAsyncId() + '/n');
        callback(Date.now());
    }, 1000)
}


// Call the function
whatTImeIsIt(function (time) {
    fs.writeSync(1, 'The time is ' + time + '\n');
})


// Hooks
var hooks = {
    init(asyncId, type, triggerAsybcId, resource) {
        fs.writeSync(1, "Hook init" + asyncId)
    },
    before(asyncId) {
        fs.writeSync(1, "Hook before" + asyncId)
    },
    after(asyncId) {
        fs.writeSync(1, "Hook after" + asyncId)
    },
    destroy(asyncId) {
        fs.writeSync(1, "Hook destroy" + asyncId)
    },
    promiseResolved(asyncId) {
        fs.writeSync(1, "Hook promiseResolved" + asyncId)
    }
}

// CVreate a new instance

var asyncHook = async_hooks.createHook(hooks);
asyncHook.enable();