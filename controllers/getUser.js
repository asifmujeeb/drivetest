// Controller to get the user from MongoDB (no longer used)

const DriveTestPost = require('../models/UserModel')

module.exports = async (req, res) => {
    let LicenseInput = req.query.license;
    try {
        const output = await DriveTestPost.findOne({ "LicenseNo": LicenseInput });
        console.log("Fetched data from DB: " + output);
        if (output) {
            res.render('g_test', { output });
        } else {
            res.redirect('/g2_test');
        }
    } catch (error) {
        console.log(error);
    }
}