/**
 * This is an example VM
 * Running some arbitary code
 */


//  Dependencies
var vm = require('vm');

// Define a context
var context = {
    'foo': 25
};


// Defien the script
var script = new vm.Script(`
foo = foo * 2;
var bar = foo + 1;
var fizz = 52;
`);
// Run the script
script.runInNewContext(context);
console.log(context);