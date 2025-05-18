// Controller to display "Appointment" page if an ADMIN user is logged in

const appointmentSchema = require('../../models/AppointmentModel')
const DriveTestPost = require('../../models/UserModel')


module.exports = async (req, res) => {

  try {
    let selectedDate = new Date().toISOString().slice(0, 10)
  //console.log("displayAppointment - Today is:", selectedDate);

    let slot09 = false;
    let slot10 = false;
    let slot11 = false;
    let slot12 = false;
    let slot01 = false;

    if (await appointmentSchema.findOne({ 'date': selectedDate, 'time': "09:00" })) { slot09 = true }
    if (await appointmentSchema.findOne({ 'date': selectedDate, 'time': "10:00" })) { slot10 = true }
    if (await appointmentSchema.findOne({ 'date': selectedDate, 'time': "11:00" })) { slot11 = true }
    if (await appointmentSchema.findOne({ 'date': selectedDate, 'time': "12:00" })) { slot12 = true }
    if (await appointmentSchema.findOne({ 'date': selectedDate, 'time': "01:00" })) { slot01 = true }

    const output = await DriveTestPost.find({});

    const userList = output.filter(data=> data.userType == "Driver")

    res.render('appointment', { slot09, slot10, slot11, slot12, slot01, selectedDate, userList});

  } catch (error) {
    console.log(error);
  }
}

        // console.log("DisplayAppointment slot09: ", slot09)
        // console.log("DisplayAppointment slot10: ", slot10)
        // console.log("DisplayAppointment slot11: ", slot11)
        // console.log("DisplayAppointment slot12: ", slot12)
        // console.log("DisplayAppointment slot01: ", slot01)