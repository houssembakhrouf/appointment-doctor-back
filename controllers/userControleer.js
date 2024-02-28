
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
const { validationResult }=require('express-validator')
const Doctor =require('../models/doctorModel')
const Appointment=require('../models/appointmentModels')


const   Register=async(req,res)=>{
   

    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
         res.status(400).json({msg:errors.array()})
        }else{
            const {name,email,password}=req.body
            const existUser= await User.findOne({email:email})
            if(existUser){
                res.status(400).json({msg:'User already exist ! pls login '})
            }else{
            const  hashPW=await bcrypt.hash(password ,10 )
            const newUser = await User.create({name,email,password:hashPW,timestamps:Date.now()})
            const token=await jwt.sign({id:newUser._id},process.env.JWT_TOKEN,{expiresIn:"7d"})
            res.status(200).json({msg:'Register Done', token})
            }
           

        }
       
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }

}


const Login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const existUser=await User.findOne({email:email})
        if(!existUser){
           res.status(400).json({msg:'make sure to register first !!'})
        }else{
            const verifyPw=await bcrypt.compare(password,existUser.password)
            if(!verifyPw){
                res.status(400).json({msg:'wrong password pl try again !'})
            }else{
                const token=await jwt.sign({id:existUser._id},process.env.JWT_TOKEN,{expiresIn:"7d"})
                res.status(200).json({msg:"Login done !",token} )
            }
        }


    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})

    }
}

const Userdata=async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.body.userId})
        if(!user){
            res.status(400).json({msg:' user not exist !'})


        }else{
            res.status(201).json({msg:'get user data!',user})
        }
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }
}

const applyDoctor=async(req,res)=>{
    try {
        const newdoctor=await Doctor.create({...req.body, status:'pending'})
        const adminUser=await User.findOne({isAdmin:true})
        const unseenNotification =  adminUser.unseenNotification
        unseenNotification.push({
            type:"new-doctor-request",
            message:`${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account `,
            data:{
                doctorId:newdoctor._id,
                name:newdoctor.firstName + "" + newdoctor.lastName
            }, 
            onclickPath:'/admin/doctorslist'
            
        })
        await User.findByIdAndUpdate(adminUser._id , {unseenNotification})
        res.status(200).json({msg:"doctor account applied successfuly",newdoctor} )



    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})

    }
    
}

const marknotification=async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.body.userId})
        const  unseenNotification =  user.unseenNotification
        const seenNotification=user.seenNotification;
        seenNotification.push(...unseenNotification)
        user.unseenNotification=[];
        user.seenNotification=seenNotification;
        const updateUser= await user.save()
        updateUser.password= undefined ;
        res.status(200).json({msg:"All notification marked as seen",updateUser} )

        
        
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})

    }
}

const deletenotifications=async(req,res)=>{
  try {
    const user=await User.findOne({_id:req.body.userId})
    user.unseenNotification=[];
    user.seenNotification=[];
    const updateUser= await user.save()
        updateUser.password= undefined ;
        res.status(200).json({msg:"All notification marked as seen deleted",updateUser} )
    
  } catch (error) {
    res.status(500).json({msg:'somthing wrong'})
 

  }


}

const getAllApproveddoctors=async(req,res)=>{
    try {
        
        const Doctors=await Doctor.find({status:"approved"})
        res.status(201).json({msg:'Doctors getted successfully',Doctors})
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})

    }
}


const addppointment = async (req, res) => {
    try {
      req.body.status = "pending";

      const newAppointment =await Appointment.create({...req.body, status:'pending'});
      res.status(201).json({ msg: 'Appointment created successfully' , newAppointment});

      
      const user = await User.findOne({ _id: req.body.doctorInfo.userId });
     

      // Corrected typo in the "success" property
      user.unseenNotification.push({
        type: "new appointment-request",
        message: `A new appointment request has been made by ${req.body.userInfo.name}`,
        onclickPath: '/doctor/appointments',
        success: false,
      });
  
      // Remove unused variable "error"
      await user.save();

    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ msg: 'Something went wrong on the server' });
    }
  };
  

  const getAllApppointmentsbyuserId=async(req,res)=>{
    try {
        
        const appointments=await Appointment.find({userId:req.body.userId})
        res.status(201).json({msg:'appointments getted successfully',appointments})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        res.status(500).json({msg:'somthing wrong'})

    }
}
  
  

module.exports={Register , Login ,Userdata , applyDoctor ,marknotification , deletenotifications , getAllApproveddoctors , addppointment , getAllApppointmentsbyuserId}