require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 4000;
const router = require("./router/auth-router");
const connectDb = require("./utils/db");

app.use(express.json()); //Middleware

app.use("/api/auth", router);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("server is running at port: ", PORT);
  });
});
