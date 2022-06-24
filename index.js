/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
const express = require('express');
const multer = require('multer');

// Upload foldr
const UPLOADS_FOLDER = './upload';

// package the final multer uppload object
const upload = multer({
    dest: UPLOADS_FOLDER,
    limits: {
        fileSize: 1000000, // 1MB
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'avatar') {
            if (
                file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new Error('Only .jpg, .png or .jpeg format  allowed!'));
            }
        } else if (file.fieldname === 'doc') {
            if (file.mimetype === 'aplication/pdf') {
                cb(null, true);
            } else {
                cb(new Error('only .pdf format allowed'));
            }
        } else {
            cb(new Error('There wass an unknown error'));
        }
    },
});

const app = express();

// Apliction Route

app.post(
    '/',
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'doc', maxCount: 1 },
    ]),
    (req, res) => {
        res.send('upload sucessfully');
    },
);

// defult errr handler

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(500).send('there was an upload err!');
    } else {
        res.send(res.status(500).send(err.message));
    }
});

app.listen(3000, () => {
    console.log('lisitening on port 3000');
});
