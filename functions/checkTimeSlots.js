// Function that returns available timeslots

const appointmentSchema = require('../models/AppointmentModel');

const checkTimeSlots = async (date) => {
  try {

    const slots = {
      slot09: false,
      slot10: false,
      slot11: false,
      slot12: false,
      slot01: false
    };

    const appointments = await appointmentSchema.find({ date, isTimeSlotAvailable: "true" });
  //console.log('Appointments found:', appointments);

    appointments.forEach(({ time }) => {
      if      (time == "09:00") slots.slot09 = true;
      else if (time == "10:00") slots.slot10 = true;
      else if (time == "11:00") slots.slot11 = true;
      else if (time == "12:00") slots.slot12 = true;
      else if (time == "01:00") slots.slot01 = true;
    });
    const isAnySlotTrue = Object.values(slots).some(value => value === true);

    console.log('Slots found:', slots);
    return { ...slots,isAnySlotTrue };

  } catch (error) {
    console.error('Error checking time slots:', error);
    throw error;
  }
};

module.exports = checkTimeSlots;