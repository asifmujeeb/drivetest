// Function that returns drivers appointments 

const UserCollection = require('../models/UserModel');
//const AppointmentCollection = require('../models/AppointmentModel');

const checkAppointments = async (date, testType) => {
  try {

    let matchCriteria = {};
    if (testType=="") { matchCriteria = { 'appointment.date': date, 'appointment.isTimeSlotAvailable': 'false' }; }
    else              { matchCriteria = { 'appointment.date': date, 'appointment.isTimeSlotAvailable': 'false', 'TestType': testType }; }
    console.log("testType:", testType);
    console.log("matchCriteria:", matchCriteria); 

    const slots = { slot09: false, slot10: false, slot11: false, slot12: false, slot01: false }; 

    const linkedCollections = await UserCollection.aggregate([  // https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#join-conditions-and-subqueries-on-a-joined-collection
      {
        $lookup: {  
          from: 'appointments',
          localField: 'appointmentID',
          foreignField: '_id',
          as: 'appointment'
        }
      },
      {
        $unwind: '$appointment'
      },
      {
        $match: matchCriteria
      }
    ]);
    console.log("Appointments found: ", linkedCollections);

    linkedCollections.forEach(( appointment ) => {
      if (appointment.appointment.time == "09:00" && appointment.Pass == null ) slots.slot09 = true;
      else if (appointment.appointment.time == "10:00" && appointment.Pass == null) slots.slot10 = true;
      else if (appointment.appointment.time == "11:00" && appointment.Pass == null) slots.slot11 = true;
      else if (appointment.appointment.time == "12:00" && appointment.Pass == null) slots.slot12 = true;
      else if (appointment.appointment.time == "01:00"&& appointment.Pass == null) slots.slot01 = true;
    });
    const isAnySlotTrue = Object.values(slots).some(value => value === true);
    //console.log('Appointments found:', slots);
    return { ...slots,isAnySlotTrue };

  } catch (error) {
    console.error('Error checking time slots:', error);
    throw error;
  }
};

module.exports = checkAppointments;