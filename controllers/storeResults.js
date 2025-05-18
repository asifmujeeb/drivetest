
const DriveTestPost = require('../models/UserModel')

module.exports = async (req, res) => {
    try {
        const pass = req.query.pass == "pass" ? true : false;
        const output = await DriveTestPost.findOneAndUpdate({ "username": req.query.username },
            { Comment: req.query.comment,
                Pass: pass
             },
            { new: true });
        if (output) {
            res.redirect('/g2_test');
        }
    } catch (error) {
        console.log(error);
    }
}