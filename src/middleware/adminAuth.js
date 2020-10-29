const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log(authHeader, ' AUTH HEADER ---------------------------------------')
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        error.message = 'Unauthorized action'
        throw error;
    };
    const token = authHeader.split(" ")[1]
    console.log(token, 'TOEKN');
    let decryptToken;

    try {
        decryptToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    };

    if (!decryptToken) {
        console.log('NO DECODE TOKEN')
        const error = new Error('Not authorized');
        error.statusCode = 401;
        throw err;
    };

    // assigning the email from the decrypted token to be the value of the property email of the request
    req.email = decryptToken.email;
    next();
};