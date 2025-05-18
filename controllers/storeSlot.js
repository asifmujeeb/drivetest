// Controller to store Appointment Slots in MongoDB

const Appointment = require('../models/AppointmentModel')

module.exports = async (req, res) => {
    // const inputDate = new Date(req.body.date).toISOString().slice(0, 10);
    // console.log("Input date is ", inputDate);
    console.log("storeSlot.js - req.body: ", req.body);

    try {
        if (req.body.slot0900) { await Appointment.create({ 'date': req.body.date, 'time': req.body.slot0900 }); }
        if (req.body.slot1000) { await Appointment.create({ 'date': req.body.date, 'time': req.body.slot1000 }); }
        if (req.body.slot1100) { await Appointment.create({ 'date': req.body.date, 'time': req.body.slot1100 }); }
        if (req.body.slot1200) { await Appointment.create({ 'date': req.body.date, 'time': req.body.slot1200 }); }
        if (req.body.slot0100) { await Appointment.create({ 'date': req.body.date, 'time': req.body.slot0100 }); }
        res.redirect('back');

    }
    catch (error) {
        console.log("Something went wrong while creating appointment(s).");
        console.log(error);
        res.redirect('/appointment')
    }
}