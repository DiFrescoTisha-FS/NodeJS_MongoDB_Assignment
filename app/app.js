const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const artistRoutes= require("../api/routes/artists");
const songRoutes = require("../api/routes/songs");

// // middleware for logging
app.use(morgan("dev"));

// // parsing middleware
app.use(express.urlencoded({
    extended: true
}));

// middleware that all request are json
app.use(express.json());

// middleware to handle CORS Policy
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, PUT, GET, PATCH, DELETE");
    }
    next();
});

app.get ("/", (req, res, next) => {
    res.status(201).json({
        message: "Service is UP!",
        method: req.method
    });
});

app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);

// // add middleware to handle bad urls and errors
app.use((req,res,next) => {
    const error = new Error("Not Found!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error:{
         message: error.message,
         status: error.status,
        //  method: req.method
    }
  })
});

// connect to mongodb
mongoose.connect(process.env.mongoDBURL, (err) => {
    if(err) {
        console.error("Error: ", err.message);
    } 
    else {
        console.log("MongoDB connection successful");
    }
})

module.exports = app;