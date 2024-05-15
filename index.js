const express = require("express");
const dotenv = require("dotenv");
const dbconnect = require("./dbconnect");
const authrouter = require("./routers/authrouter");
const postrouter = require("./routers/postRouter");
const userrouter = require("./routers/userRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
dotenv.config("./.env");

// Clodinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
const app = express();

app.use(morgan("common"));

//
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// Creating an end point JTC
app.get("/", (req, res) => {
  res.status(200).send("App is working fine");
});

// Routers
app.use("/auth", authrouter);
app.use("/post", postrouter);
app.use("/user", userrouter);
const PORT = process.env.PORT || 4002;
dbconnect();
app.listen(PORT, () => {
  console.log(`Listening to Port: ${PORT}`);
});
