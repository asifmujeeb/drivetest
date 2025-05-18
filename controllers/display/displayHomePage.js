// Controller to display Home/Dashboard Page

module.exports = (req, res) => {
    res.render('dashboard')
    console.log("Session object details: ", req.session);
}