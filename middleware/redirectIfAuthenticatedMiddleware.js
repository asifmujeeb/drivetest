// Middleware to redirect if user is authenticated.

module.exports = (req, res, next) => {
    if (req.session.userId) {
        console.log("User was redirected to the Home Page because already logged in.")
        return res.redirect('/')
    }
    next()
}