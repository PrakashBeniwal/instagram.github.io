const User = require('../models/User')
const JWT_SECRET = 'prakashbeniwal'
var jwt = require('jsonwebtoken');
const authtoken = (req, res, next) => {
    const token = req.header('auth-token')

    try {
        if (!token) {
            res.send('not allowed')
        }

        const data = jwt.verify(token, JWT_SECRET);
        const { _id } = data.user;
        User.findById(_id).then(
            data => {
                req.user = data;
                next();
            }
        )


    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = authtoken;