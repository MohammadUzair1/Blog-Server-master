const express = require('express');             // Import expressjs
const mongoose = require('mongoose');           // Import mongoose

const port = process.env.PORT || 3000;
const app = express();                       // Create expressjs object

// Connect MongoDb
// mongoose.connect('mongodb://localhost:27017/BlogDb');    // Local
mongoose.connect('mongodb+srv://Uzair:uzairkhanbapar@cluster0.qc33xvl.mongodb.net/?retryWrites=true&w=majority');
// Check connection is established
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDb connected');
});

// middleware
app.use('/uploads', express.static('uploads'));   // Make uploads folder to make it accessible from browser
app.use(express.json());    // For Json Data
// User Route
const userRoute = require('./routes/user');
app.use('/user', userRoute);
// Profile Route
const profileRoute = require('./routes/profile');
app.use('/profile', profileRoute);
// Blog Route
const blogRoute = require('./routes/blogpost');
app.use('/blogPost', blogRoute);

app.route('/').get((req, res) => res.json('Hello World! This is the API created using Node Js and deployed over AWS server'));
// app.listen(port, () => console.log(`Your server is running on port ${port}`));

// Added 0.0.0.0 to run server from local ip address
app.listen(port, '0.0.0.0', () => console.log(`Your server is running on port ${port}`));