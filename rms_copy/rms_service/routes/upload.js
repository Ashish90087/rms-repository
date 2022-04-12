var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
multer = require('multer');
var bodyParser =require('body-parser');
var db = require('../dbconnection');
const DIR = './uploads';



let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, DIR);
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage });

router.post('/file', upload.single('file'), (req, res, next) => {
  //console.log("i am inside file");
    const file = req.file;
    console.log(file.path);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    else {
    //   fs.mkdir(req.body.folder_name, { recursive: true }, function(err) {
    //       if (err) {
    //           console.log(err)
    //       } else {
    //           fs.rename('./uploads/' + file.filename, req.body.folder_name + file.filename, function(err) {
    //               console.log(err);
    //           });
    //       }
    //   })
    fs.exists(req.body.folder_name + req.body.prev_file_name, function(exists) {
        if(exists) {
            fs.unlink(req.body.folder_name + req.body.prev_file_name, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
                fs.rename('./uploads/' + file.filename, req.body.folder_name + file.filename, function(err) {
                    console.log(err);
                });
            });
        } else {
            console.log(exists);
            fs.mkdir(req.body.folder_name, { recursive: true }, function(err) {
                if (err) {
                    console.log(err)
                } else {
                    fs.rename('./uploads/' + file.filename, req.body.folder_name + file.filename, function(err) {
                        console.log(err);
                    });
                }
            })
        }
    })


      message = "Successfully! uploaded";
    //   res.json({ message: message, status: 'success', filepath: req.body.folder_name.replace('./uploads/', '') + file.filename });
    res.json({ message: message, status: 'success', filepath: req.body.folder_name.replace('./uploads/', '') + file.filename, 'file_name': file.filename});
  }

    
  })

module.exports = router;