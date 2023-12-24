const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, process.env.JWT_KEY);
        req.user = data ;
        next();       
    } catch (error) {
        return res.status(401).json({
            message : "Auth failed",
        });
    }

}