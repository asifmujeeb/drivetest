// Controller to display "Examination" page

const checkAppointments = require('../../functions/checkAppointments');
//const appointmentSchema = require('../models/AppointmentModel')

module.exports = async (req, res) => {

  try {
    const selectedDate = new Date().toISOString().slice(0, 10); // Use the CURRENT date as the selected date
    console.log("DisplayExamination - selectedDate:", selectedDate);
    const selectedTestType = "";


    const slots = await checkAppointments(selectedDate, selectedTestType); // Get the drivers appointments
    console.log("DisplayEXAMINER:", slots);

    if (req.session.userId) {
      res.render('examination', { ...slots, selectedDate, selectedTestType });
    }
    else { res.redirect('/login'); }

  } catch (error) {
    console.log(error);
  }
}