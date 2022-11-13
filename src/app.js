const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");


const app =  express();

// Settings
app.set("port", process.env.PORT || 3500);

//Midleewares
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


//Routes
app.use(require("./routes/index.routes"));
app.use("/artist",require("./routes/artist.routes"));

//Public
/* app.use("/public", express.static(`${__dirname}/storage/imgs`)); */

module.exports = app;