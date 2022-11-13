const multer = require("multer");

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, null);
        //podria guardarse de manera local tambien
        //./src/storage/imgs
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp' ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;