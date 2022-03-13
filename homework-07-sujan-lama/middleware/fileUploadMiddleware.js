const path = require('path');
const multer = require('multer');
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
    fileFilter: async (req, file, cb) => {

        if (!req.body.id) {
            return cb(new Error("id is required"));
        }

        const student = (await req.collection.findOne({ _id: parseInt(req.body.id) }));

        if (student == null) {
            return cb(new Error(`No student found for id: ${req.body.id}`))
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