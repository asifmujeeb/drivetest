// Controller to display "Evaluate" page
const appointmentSchema = require('../../models/AppointmentModel')
const DriveTestPost = require('../../models/UserModel');


module.exports =async (req, res) => {
    try{
        const{date,slots} = req.query
        const appointment = await appointmentSchema.findOne({ "date": date, "time":slots });
        if(appointment){
            const user = await DriveTestPost.findOne({ appointmentID: appointment._id });
            res.render('results',{userdetails:user})
        }

    }catch(error){
        console.log(error)
    }
}