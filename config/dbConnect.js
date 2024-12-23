const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: ".env"});
let MONGO_URI = process.env.DB_PASSWORD;

// console.log(MONGO_URI);

const dbConnect = async () => {
  mongoose.set("strictQuery", true);

  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log(`MongoDb Connected: ${connect.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err);
    process.exit(10);
  }
};

module.exports = dbConnect;
