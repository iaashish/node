var express = require('express');
var multer = require('multer');
var ejs = require('ejs');
var path = require('path');
var app = express();
const fs = require('fs');


//Storage Engine
var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

function checkFileType(file, cb) {
    var filetypes = /jpeg|jpg|png/;

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    var mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
}

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            if (req.body.folder.input.length == 0) {
                res.render('index', {
                    msg1: 'Please Enter Input Folder'
                });

            } else if (req.body.folder.output.length == 0) {
                res.render('index', {
                    msg2: 'Please Enter Output Folder'
                });
            } else {

                // Use python shell
                var myPythonScriptPath = 'one.py';

                // Use python shell
                var PythonShell = require('python-shell');
                fs.readdir('./public/input', function(err, items) {
                    console.log(items);
                    for (var i = 0; i < items.length; i++) {
                        var options = {
                            args: ['hello', items[i]],
                            pythonPath: 'C:/Users/ippil/Anaconda2/python'
                        };
                        var pyshell = new PythonShell(myPythonScriptPath, options);
                        pyshell.on('message', function(message) {
                            // received a message sent from the Python script (a simple "print" statement)
                            console.log("hello");
                            res.render('index', {
                                        msg: 'File uploaded!'
                                    });
                            console.log("world");
                        });

                        // pyshell.end(function(err) {
                        //     if (err) throw err;
                        //     next();
                        //     console.log('finished');
                        // });
                    }
                });
                //In python path include the python file without .exe extension

                // console.log(__dirname + "/" + req.file.path);
                // PythonShell.run(myPythonScriptPath, options, function(err, results) {
                //     if (err) {
                //         throw err;
                //     };

                //     console.log('finished');
                //     res.render('index', {
                //         msg: 'File uploaded!',
                //         file: `uploads/${req.file.filename}`
                //     })
                // });
            }
        }
    });
});
app.use(function(req, res, next) {
    console.log(typeof req.next);

    next();
});
// Load ejs
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('Listening to port 3000!'));