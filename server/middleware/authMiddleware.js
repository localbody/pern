const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.autorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Пользователь не авторизован!'});
        }
        const decoded = jwt.verify( token, process.env.SECRE_KEY );

        req.user = decoded;

        next();

    } catch (e) {
        return res.status(401).json({message: 'Пользователь не авторизован!'});
    }
 }