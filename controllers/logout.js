// Controller to handle the Logout Process

module.exports = (req, res) => {
    req.session.destroy(() => {
        console.log("User logged out successfully");
        res.redirect('/')
    })
}