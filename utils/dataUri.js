const DatauriParser = require("datauri/parser");
const path = require("path");

const getUri = (image) => {
  if (!image || !image.originalname || !image.buffer) {
    throw new Error("Invalid Image Object");
  }

  const parser = new DatauriParser();
  const extName = path.extname(image.originalname).toString();
  return parser.format(extName, image.buffer);
};

module.exports = getUri;
