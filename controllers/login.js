// Controller to handle the Login Process and save "_id" and "userType" into browser’s session 

const User = require('../models/UserModel')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (error) {
          throw error;
        }
        if (same) {
          console.log("Login successful user", username);
        //console.log("user.userType: " + user.userType);
          req.session.userId = user._id;
          req.session.userType = user.userType;
          res.redirect('/')
        }
        else {
          console.log("Incorrect password. Redirected to Register page");
          res.render('login',{message:"Incorrect Password"})
        }
      })
    }
    else {
      console.log("Login unsuccessful. User", username, "doesn't exist in DB");
      res.render('login',{message:"User doesn't exist.Please Register"})
    };
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during login');
  }
}