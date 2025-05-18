const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const driveTestSchema = new Schema({
    firstname: { type: String, default: 'default' },
    lastname: { type: String, default: 'default' },
    LicenseNo: { type: String, default: 'default' },    // encrypted with bcrypt
    Age: { type: Number, default: '0' },

    username: { type: String, required: true, default: 'demo', unique: true },
    password: { type: String, required: true, default: 'demo' },    // encrypted with bcrypt
    userType: { type: String, required: true, default: 'Driver' },


    car_details: {
        make: { type: String, default: 'default' },
        model: { type: String, default: 'default' },
        year: { type: Number, default: '0' },
        platno: { type: String, default: 'default' }
    },
    appointmentID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Appointment'
    },
    
    TestType: { type: String }, // Values are G2 or G
    Comment:  { type: String },
    Pass:     { type: Boolean }
    
});

driveTestSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 10);
    user.LicenseNo = await bcrypt.hash(user.LicenseNo, 10);
    console.log("Password & licenseNo has been encrypted");
    next();
});

const DriveTestPost = mongoose.model('User', driveTestSchema);
driveTestSchema.plugin(uniqueValidator);

module.exports = DriveTestPost;