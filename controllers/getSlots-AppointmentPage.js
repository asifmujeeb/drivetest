// Controller to get the Appointment Slots from MongoDB

const appointmentSchema = require('../models/AppointmentModel')
const DriveTestPost = require('../models/UserModel')

module.exports = async (req, res) => {

    try {
        let selectedDate = req.query.date;

        let slot09 = false;
        let slot10 = false;
        let slot11 = false;
        let slot12 = false;
        let slot01 = false;

        if (await appointmentSchema.findOne({ 'date': req.query.date, 'time': "09:00" }))  { slot09 = true }
        if (await appointmentSchema.findOne({ 'date': req.query.date, 'time': "10:00" })) { slot10 = true }
        if (await appointmentSchema.findOne({ 'date': req.query.date, 'time': "11:00" })) { slot11 = true }
        if (await appointmentSchema.findOne({ 'date': req.query.date, 'time': "12:00" })) { slot12 = true }
        if (await appointmentSchema.findOne({ 'date': req.query.date, 'time': "01:00" }))  { slot01 = true }
        const output = await DriveTestPost.find({});

        const userList = output.filter(data=> data.userType == "Driver")
        res.render('appointment', { slot09, slot10, slot11, slot12, slot01, selectedDate,userList });

    } catch (error) {
        console.log(error);
    }
}