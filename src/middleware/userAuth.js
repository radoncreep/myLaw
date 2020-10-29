const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        error.message = 'Not authenticated'
        throw error;
    };
    const token = authHeader.split('')[1];
    let decryptToken;

    try {
        decryptToken = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    };

    if (!decryptToken) {
        const error = new Error('Not authorized');
        error.statusCode = 401;
        throw err;
    };

    // assigning the email from the decrypted token to be the value of the property email of the request
    req.email = decryptToken.email;
    next();
};