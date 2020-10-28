const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

// Custom import
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

//middlewares
app.use(express.json());
app.use(morgan('dev'))


// route middleware
app.use(adminRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(categoryRoutes);

// error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;

    console.log(data, ' error data');
    return res.json({ errorData: data });
});

const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI, 
    { useNewUrlParser: true,
    useUnifiedTopology: true 
    })
    .then(response => {
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    }).catch(err => console.log(err));



