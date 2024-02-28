
const mongoose=require('mongoose');

const doctorschema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String ,
        default:true,
    },
    website:{
        type:String ,
        default:true,
    },
    address:{
        type:String ,
        default:true,
    },
    specialization:{
        type:String ,
        default:true,
    },
    experience:{
        type:String ,
        default:true,
    },
    feePerConsultation:{
        type:Number,
        default:true,
    },
   
    fromTime:{
        type:String,
        required:true
    },
    toTime:{
        type:String,
        required:true

    },
    status:{
        type:String,
        default:"pending"
    }

   
  
} ,
{
    timestamps:  { type: Date, immutable: true }

})

const doctorModel=mongoose.model('doctor' , doctorschema)


module.exports = doctorModel