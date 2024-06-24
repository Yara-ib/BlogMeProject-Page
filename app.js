// ~ The main file to handle routes of the main page ~

// Importing Express.Js to handle routes
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');

// Importing mongoose to handle the database models
const mongoose = require('mongoose');

// Getting the Authentication details from the .env file
const dotenv = require('dotenv');
dotenv.config();

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI)
.then(result => {
    console.log('Connected Successfully to MongoDB Database');
})
.catch(err => {
    console.log(err);
});

// Saving the express function in constant to be used later in handling routes
const app = express();
const port = 3000 || process.env.port;

// To accept JSON response format when using POST requests
app.use(express.json());

app.use(express.static('public'));
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use('/', require('./server/routes/main'));

// Handling the Routes
// app.use('/server/user', userRouter);
// app.use('/server/auth', authRouter);

// The middleware that handles Errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.errorMessage || 'Internal Server Error';
    res.status(statusCode).json({
        statusCode,
        errorMessage,
        success: false,
    });
});

// Listening to the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
