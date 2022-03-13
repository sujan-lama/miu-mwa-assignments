const path = require('path');
const multer = require('multer');
const students = require('../datastore/students');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets/pics'));
    },
    filename: (req, file, cb) => {
        cb(null, Math.floor(new Date().getTime() / 1000) + ".jpg");
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {

        if (!req.body.id) {
            return cb(new Error("id is required"));
        }

        const id= parseInt(req.body.id);
        const studentsCopy = JSON.parse(JSON.stringify(students));
        const student = studentsCopy.filter(v => v.id === id)[0];
        
        if (!student) {
            return cb(new Error(`No student found of id: ${id}`))
        }

        if (!['.jpg', '.jpeg'].includes(path.extname(file.originalname).toLowerCase())) {
            return cb(new Error("Only .jpg and .jpeg file is supported."));
        }
        cb(null, true);
    },

}).single('picture');

module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return next(err);
        }

        if (!req.file) {
            return next(new Error("picture is required"));
        }
        next();
    });
}