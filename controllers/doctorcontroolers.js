const Doctor=require('../models/doctorModel')
const Appointment=require('../models/appointmentModels')
const User=require('../models/userModel')
const Doctordata=async(req,res)=>{
    try {
        const doctor=await Doctor.findOne({userId:req.body.userId})
        if(!doctor){
            res.status(400).json({msg:' docotr not exist !'})


        }else{
            res.status(201).json({msg:'get doctor data!',doctor})
        }
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }
}

const updateDoctordata=async(req,res)=>{
    try {
        const doctor=await Doctor.findOneAndUpdate({userId:req.body.userId} , req.body ,{new:true} )
        if(!doctor){
            res.status(400).json({msg:' docotr not exist !'})


        }else{
            res.status(201).json({msg:' doctor updated successfully!',doctor})
        }
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }
}

const getDoctordatabydoctorId=async(req,res)=>{
    try {
        const doctor=await Doctor.findOne({ doctorId:req.body.doctorId})
        if(!doctor){
            res.status(400).json({msg:' doctor not exist !'})


        }else{
            res.status(201).json({msg:'get doctor data!',doctor})
        }
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }
}

const getAllApppointmentsbydoctorId=async(req,res)=>{
    try {
        const doctor= await Doctor.findOne({userId:req.body.userId})
        const appointments=await Appointment.find({doctorId:req.body.doctorId})
        res.status(201).json({msg:'appointments getted successfully',appointments})
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})

    }
}

const changeappointmentsatus = async (req, res) => {
    try {
        const { appointmentId ,status } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status });

        const user = await User.findOne({ _id: appointment.userId });
        const unseenNotification = user.unseenNotification;
        unseenNotification.push({
            type: "appointment-status-changed",
            message: `Your appointment status has been ${status}`,
            onclickPath: '/appointments'
        });
        await user.save(); // Fix the typo here, it should be await user.save();

        res.status(201).json({ msg: 'appointment status updated successfully' , appointment });
    } catch (error) {

        res.status(500).json({ msg: 'Something went wrong' });
    }
};



module.exports= {Doctordata , updateDoctordata , getDoctordatabydoctorId , getAllApppointmentsbydoctorId , changeappointmentsatus}