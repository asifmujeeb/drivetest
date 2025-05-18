// Controller to display "G Test" page if the user is logged in

const DriveTestPost = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const checkTimeSlots = require('../../functions/checkTimeSlots');

module.exports = async (req, res) => {

  try {
    const output = await DriveTestPost.findById(req.session.userId);
    let licenseIsDefault;

    let selectedDate = new Date().toISOString().slice(0, 10);
    console.log("displayG - selectedDate:", selectedDate);
    const slots = await checkTimeSlots(selectedDate);  // Get the available time slots for the selected date

    if (req.session.userId) {
      bcrypt.compare('default', output.LicenseNo, (error, same) => {
        if (error) { throw error; }
        if (same)  { licenseIsDefault = true;
                     return res.render('g2_test', { output, licenseIsDefault, ...slots, selectedDate }); }
        else       { licenseIsDefault = false; }
        return res.render('g_test', { output, licenseIsDefault, ...slots, selectedDate });
      });
    } 
    else { res.redirect('/login'); }
  } 
  catch (error) {
    console.log(error);
  }
};