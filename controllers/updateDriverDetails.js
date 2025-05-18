// Controller to store the User credentials and User Type in MongoDB
const DriveTestPost = require('../models/UserModel.js')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
      //const Id = req.params.id;
        const Id = req.session.userId;
        const encryptedLicenseNo = await bcrypt.hash(req.body.licenseNumber, 10);

        const updatedUser = await DriveTestPost.findByIdAndUpdate(
            Id,
            {
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                LicenseNo: encryptedLicenseNo,
                Age: req.body.age,

                'car_details.make': req.body.make,
                'car_details.model': req.body.model,
                'car_details.year': req.body.year,
                'car_details.platno': req.body.platNumber
            },
            { new: true }
        );

        if (updatedUser) {
            console.log("New/updated values on DB: ", req.body);
            res.redirect('/');

        } else {
            res.status(404).send('Error: License number not found');
            console.log(DriveTestPost);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}