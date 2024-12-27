const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {fileSize: 5 * 1024 * 1024}, // 5mb          //  1 Byte = 8 Bits
}).single("image");

module.exports = upload;
