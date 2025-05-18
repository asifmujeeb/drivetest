const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isTimeSlotAvailable: {
        type: String,
        required: true,
        default: "true"
    }
});

const DriveTestPost = mongoose.model('Appointment', appointmentSchema);
module.exports = DriveTestPost;