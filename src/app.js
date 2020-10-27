const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

// Custom import
const productRoute = require('./routes/productRoute');
//middlewares
app.use(express.json());


// route middleware
app.use(productRoute);

const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI, 
    { useNewUrlParser: true,
    useUnifiedTopology: true 
    })
    .then(response => {
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    }).catch(err => console.log(err));



