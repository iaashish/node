// var spawn = require('child_process').spawn,
    // py    = spawn('python', ['one.py',"C:\myfolder\srinath recep\VST_5394.JPG"]);
	
var myPythonScriptPath = 'one.py';

// Use python shell
var PythonShell = require('python-shell');
var options = {
    args: ['C:\\myfolder\\srinath recep\\VST_5394.JPG']
};
// var pyshell = new PythonShell(myPythonScriptPath);

 // pyshell.send(JSON.stringify(['C:\myfolder\srinath recep\VST_5394.JPG']));
PythonShell.run(myPythonScriptPath, options, function(err, results){
if (err){
        throw err;
    };

    console.log('finished');
});
 
// PythonShell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    // console.log(message);
// });

// end the input stream and allow the process to exit
// PythonShell.end(function (err) {
    // if (err){
        // throw err;
    // };

    // console.log('finished');
// });