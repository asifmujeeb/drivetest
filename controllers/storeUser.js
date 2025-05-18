// Controller to store the User credentials and User Type in MongoDB

const User = require('../models/UserModel')
//const path = require('path')

module.exports = async (req, res) => {
    try {
        // variables for showing error message
        var username = ""
        var password = ""
        const data = req.flash('data')[0];
        if(typeof data != "undefined"){
        username = data.username
        password = data.password
        }
        if (req.body.password == req.body.passwordConf) {
            const user = await User.create(req.body);
            console.log("New user credentials: ", user);
            res.redirect('/login');
        } else {
            console.log("Passwords don't match");
            res.render('register', { errors: req.flash('validationErrors'),
                username: username,
                password: password,message:"Passwords don't match"}) 
        }
    }
    catch (error) {
        // get error message from server and show in page
        if (error.name === 'ValidationError') {
            const validationErrors = Object.keys(error.errors).map(key =>
            error.errors[key].message);
            req.flash('validationErrors', validationErrors);
            return res.redirect('/auth/register');
        }
          console.log(error.name);
    }
}