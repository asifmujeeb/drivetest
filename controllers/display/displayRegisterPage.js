// Controller to display "Register" page

module.exports = (req, res) => {

     // variables for validation
     var username = ""
     var password = ""
     const data = req.flash('data')[0];
     if(typeof data != "undefined"){
       username = data.username
       password = data.password
     }
     res.render('register',{
         errors: req.flash('validationErrors'),
         username: username,
         password: password,
         message: null
         }) // render register.ejs
}