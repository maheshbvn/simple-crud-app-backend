const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const Product = require('./models/product.model.js');
const productRoute = require("./routes/product.route.js");

// Load environment variables
dotenv.config();

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send("Hello from Node API updated");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Database!");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.log("Connection Failed!", error.message);
    });
