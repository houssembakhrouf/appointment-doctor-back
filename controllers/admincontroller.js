const User=require('../models/userModel')
const Doctor=require('../models/doctorModel')


const getAlldoctors=async(req,res)=>{
    try {
        
        const Doctors=await Doctor.find()
        res.status(201).json({msg:'Doctors getted successfully',Doctors})
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})

    }
}

const getAllusers=async(req,res)=>{
    try {
        
        const Users=await User.find()
        res.status(201).json({msg:'Users getted successfully',Users})
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})

    }
}


const changestatus = async (req, res) => {
    try {
        const { doctorId ,status } = req.body;

        const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });

        const user = await User.findOne({ _id: doctor.userId });
        const unseenNotification = user.unseenNotification;
        unseenNotification.push({
            type: "new-doctor-request-changed",
            message: `Your doctor account has been ${status}`,
            onclickPath: '/notifications'
        });
        user.isDoctor = status === "approved" ? true : false
        await user.save(); // Fix the typo here, it should be await user.save();

        res.status(201).json({ msg: 'Doctor status updated successfully', doctor });
    } catch (error) {

        res.status(500).json({ msg: 'Something went wrong' });
    }
};



module.exports = {getAlldoctors , getAllusers ,changestatus}