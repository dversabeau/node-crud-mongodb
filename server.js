const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const userRoutes = require("./routes/user.routes");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//router
app.use("/api/user", userRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
