// Controller to book and Appointment

const Appointment = require('../models/AppointmentModel')
const User = require('../models/UserModel')

module.exports = async (req, res) => {
  console.log("bookAppointment.js - req.body: ", req.body);
  console.log("bookAppointment.js - req.session.userId: ", req.session.userId);

  try {

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { date: req.body.date, time: req.body.slots },
      { isTimeSlotAvailable: "false" }
    );

    if (updatedAppointment) {
      console.log("updatedAppointment: ", updatedAppointment);

    } else {
      // res.status(404).send('Error: License number not found');
      console.log("Appointment object: ", Appointment);
    }


    const updatedUser = await User.findByIdAndUpdate(
      req.session.userId,
      { appointmentID: updatedAppointment._id, TestType: req.body.TestType ,Comment: '',Pass: null  }
    );

    if (updatedUser) {
      console.log("BookAppointment - updatedUser: ", updatedUser);
      res.redirect('/');

    } else {
      console.log("User object: ", User);
    }

  }
  catch (error) {
    console.log("Something went wrong while booking appointment.");
    console.log(error);
    res.redirect('/g2_test')
  }
}