const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

// configuration
dotenv.config();

// connect to database
mongoose
    .connect(
        process.env.MONGO_URL
    ).then(() => {
        console.log("Database connection successfull");
    }).catch(err => {
        console.log("Error connecting to database: " + err);
    });

const app = express();
app.use(express.json());


app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("server is running... ")
});
