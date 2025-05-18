// Controller to get the Appointment Slots from MongoDB, and then pass it to the G Page

const UserCollection = require('../models/UserModel');
const bcrypt = require('bcrypt');
const checkTimeSlots = require('../functions/checkTimeSlots');  // Import the checkTimeSlots function

module.exports = async (req, res) => {

  try {
    const output = await UserCollection.findById(req.session.userId);
    let licenseIsDefault;
        
    let selectedDate = req.query.date;
    const slots = await checkTimeSlots(selectedDate); // Get the available time slots for the selected date

    if (req.session.userId) {
      bcrypt.compare('default', output.LicenseNo, (error, same) => {
        if (error) { throw error; }
        if (same)  { licenseIsDefault = true; 
                     return res.render('g2_test', { output, licenseIsDefault, ...slots, selectedDate }); } 
        else       { licenseIsDefault = false; }
        return res.render('g_test', { output, licenseIsDefault, ...slots, selectedDate });
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.log(error);
  }
};