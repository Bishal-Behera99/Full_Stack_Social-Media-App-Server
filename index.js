const express = require("express");
const dotenv = require("dotenv");
const dbconnect = require("./dbconnect");
const authrouter = require("./routers/authrouter");
const postrouter = require("./routers/postRouter");
const morgan = require("morgan");
const app = express();
dotenv.config("./.env");

// Middlewares
app.use(express.json());
app.use(morgan("common"));
// Creating an end point JTC
app.get("/", (req, res) => {
  res.status(200).send("App is working fine");
});

// Routers
app.use("/auth", authrouter);
app.use("/post", postrouter);
const PORT = process.env.PORT || 4002;
dbconnect();
app.listen(PORT, () => {
  console.log(`Listening to Port: ${PORT}`);
});
