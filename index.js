const express = require("express");
const dotenv = require("dotenv");
const dbconnect = require("./dbconnect");
const authrouter = require("./routers/authrouter");
const app = express();
dotenv.config("./.env");
// Middlewares

app.use(express.json());
// Creating an end point JTC
app.get("/", (req, res) => {
  res.status(200).send("App is working fine");
});

// Routers
app.use("/auth", authrouter);

const PORT = process.env.PORT || 4001;
dbconnect();
app.listen(PORT, () => {
  console.log(`Listening to Port: ${PORT}`);
});
