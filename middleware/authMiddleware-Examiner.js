// Middleware to check is user is authenticated.

const User = require('../models/UserModel')

module.exports = async (req, res, next) => {
    const user = await User.findById(req.session.userId);
    try {
        if (!user || user.userType!='Examiner') {
            console.log("user: ", user);
            return res.redirect('/')
        } 
        next()
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}