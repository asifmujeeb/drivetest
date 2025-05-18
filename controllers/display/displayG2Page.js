// Controller to display "G2 Test" page if the user is logged in

const UserCollection = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const checkTimeSlots = require('../../functions/checkTimeSlots');

module.exports = async (req, res) => {

  try {
    const output = await UserCollection.findById(req.session.userId); // Get the information for the user logged in
    let licenseIsDefault;
console.log("tetstee",output)
    let selectedDate = new Date().toISOString().slice(0, 10); // Use the CURRENT date as the selected date
    console.log("displayG2 - selectedDate:", selectedDate);
    const slots = await checkTimeSlots(selectedDate); // Get the available time slots for the selected date

    if (req.session.userId) {
      bcrypt.compare('default', output.LicenseNo, (error, same) => {
        if (error) { throw error; }
        if (same)  { licenseIsDefault = true; }
        else       { licenseIsDefault = false; }
        return res.render('g2_test', { output, licenseIsDefault, ...slots, selectedDate });
      });
    } 
    else { res.redirect('/login'); }
  } 
  catch (error) {
    console.log(error);
  }
};