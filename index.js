const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({path: ".env"});
const bodyParser = require("body-parser");
const port = process.env.PORT || 6000;

const dbConnect = require("./config/dbConnect");
dbConnect();

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

// Main Routes //

// User Route //
app.use("/api/user", require("./routes/userRoutes/userRoutes"));

// Seller Route //
app.use("/api/seller", require("./routes/sellerRoutes/sellerRoutes"));

// User Product Route //
app.use(
  "/api/users/products",
  require("./routes/userRoutes/userProductRoutes")
);

// Seller Product Route //
app.use(
  "/api/sellers/products",
  require("./routes/sellerRoutes/sellerProductRoutes")
);

// User Cart Route //
app.use("/api/users/cart", require("./routes/userRoutes/cartRoutes"));

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`.bgYellow.black);
});
