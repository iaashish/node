var express = require('express');
var multer = require('multer');
var ejs = require('ejs');
var path = require('path');
var app = express();



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
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'No file selected!'
                });
            } else {

                // Use python shell
                var myPythonScriptPath = 'one.py';

                // Use python shell
                var PythonShell = require('python-shell');
                var options = {
                    args: [__dirname + "/" + req.file.path, req.file.filename],
					pythonPath:'C:/Python27/python'
                };

                console.log(__dirname + "/" + req.file.path);
                PythonShell.run(myPythonScriptPath, options, function(err, results) {
                    if (err) {
                        throw err;
                    };

                    console.log('finished');
                    res.render('index', {
                        msg: 'File uploaded!',
                        file: `uploads/${req.file.filename}`
                    })
                });


            }
        }
    })

})

// Load ejs
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('Listening to port 3000!'));