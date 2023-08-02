const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix); // Define the file naming convention
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit the file size to 5 MB (adjust as needed)
  },
  fileFilter: function (req, file, cb) {
    // Validate file types (e.g., accept only image files)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  },
});

module.exports = upload;
