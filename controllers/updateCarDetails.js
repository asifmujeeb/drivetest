// Controller to update new Car Details in MongoDB.

const DriveTestPost = require('../models/UserModel')

module.exports = async (req, res) => {
    try {

        const updatedUser = await DriveTestPost.findOneAndUpdate(
            { LicenseNo: req.body.LicenseNo },
            {
                'car_details.make': req.body.make,
                'car_details.model': req.body.model,
                'car_details.year': req.body.year,
                'car_details.platno': req.body.platno
            }
            // { new: true }
        );

        if (updatedUser) {
            console.log("New/updated values on DB: ", req.body);
            res.redirect('/');

        } else {
            res.status(404).send('Error: License number not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}