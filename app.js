var express = require('express');
var multer = require('multer');
var ejs = require('ejs');
var path = require('path');
var app = express();
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');
var formidable = require('formidable');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: false
})); // support encoded bodies

//Storage Engine
var storage = multer.diskStorage({
    destination: './public/input',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// Init upload
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).any();

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

app.post('/upload1', upload, function(req, res) {
    // create an incoming form object
    // var form = new formidable.IncomingForm();
    let files = [];
    for (var a = 0; a < req.files.length; a++) {
        files.push(req.files[a].originalname);
    }
    // Use python shell
    var myPythonScriptPath = 'image.py';

    // Use python shell
    var PythonShell = require('python-shell');
    var a = 0;
    var b = 0;
    for (var i = 0; i < files.length; i++) {
        var options = {
            args: [files[i], files[i], 'input', 'output'],
            pythonPath: 'C:/Users/ippil/Anaconda2/python' //Update with your python location
        };
        var pyshell = new PythonShell(myPythonScriptPath, options);

        pyshell.on('message', function(message, err) {
            if (err) {
                res.send("An unexpected error occured. Please try again later.");
            } else {
                // received a message sent from the Python script (a simple "print" statement)
                a = a + parseInt(message);
                b = b + parseInt(message);
                if (a == 1) {
                    res.end('success');
                }
                var width = (b / files.length) * 100 + '%';
                data = {
                    'current': b,
                    'total': files.length,
                    "width": width
                }
                fs.writeFile('views/test.json', JSON.stringify(data), 'utf8', (err) => {
                    if (err) throw err;
                });
            }
        });
        pyshell.end(function(err) {
            if (err) throw err;
        });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/gallery.html'))
});

app.get('/gallery1', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/Demo.html'))
});


app.get('/getdata', (req, res) => {
    var data = {};
    var input = [];
    var output = [];
    fs.readdir('./public/input', function(err, items) {
        data['input'] = items;
        fs.readdir('./public/output', function(err, items) {
            data['output'] = items;
            // console.log(data);
            jsonfile.writeFile('file.json', data, function(err) {
                if (err) console.log(err);
            })
        });
    });
    let student;
    jsonfile.readFile('file.json', function(err, obj) {
        res.json(obj);
    })
});

app.get('/some', function(req, res) {
    let student;
    // console.log(req.body)
    fs.readFile('views/test.json', (err, data) => {
        student = JSON.parse(data);
        res.json(student);
    });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Load ejs
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.listen(3000, function() {
    console.log('App listening at http://localhost:3000');
});