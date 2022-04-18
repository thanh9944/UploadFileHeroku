const express = require('express');
const router = express.Router();
const multer = require('multer')

const storageSingle = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.originalname.toString().indexOf('.jpg') > 0) {
            cb(null, 'uploads/');
        } else {
            cb(new Error('JPG Only!!!!'))
        }
    },
    filename: function (req, file, cb) {
        cb(null, Math.random() + Date.now() + file.originalname);
    },
});

const uploadSingle = multer({
    storage: storageSingle,
    limits: {fileSize: 2 * 1024 * 1024}
}).single('avatar')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Math.random() + Date.now() + file.originalname);
    },
})

const uploadFilter = function (req, file, cb) {
    if (file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        return cb(new Error("Only .jpg format allowed!"));
    }
}

const upload = multer({
    storage: storage,
    fileFilter: uploadFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    },

}).array('avatar', 3)
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/single', function (req, res, next) {
    uploadSingle(req, res, function (error) {
        if (error) {
            console.log('Co loi xay ra' + error.message);
            res.render('index', {message: error.message})
        } else {
            res.redirect('/')
        }
    })
});

router.post('/multi', function (req, res, next) {
    upload(req, res, function (error) {
        if (error) {
            console.log('Co loi xay ra' + error.message);
            res.render('index', {mss: error.message})
        } else {
            res.redirect('/')
        }
    })
});

module.exports = router;
