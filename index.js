const express = require("express");
const dotenv = require("dotenv");
const dbconnect = require("./dbconnect");
const authrouter = require("./routers/authrouter");
const postrouter = require("./routers/postRouter");
const userrouter = require("./routers/userRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
dotenv.config("./.env");

// Middlewares
app.use(express.json());
app.use(morgan("common"));
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
