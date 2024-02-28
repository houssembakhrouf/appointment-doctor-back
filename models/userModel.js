const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isDoctor:{
        type:Boolean ,
        default:false
    },
    isAdmin:{
        type:Boolean ,
        default:false
    },
    seenNotification:{
        type:Array,
        default:[]
    },
    unseenNotification:{
        type:Array,
        default:[]
    },
}
,{
     timestamps:  { type: Date, immutable: true }
    })

const userModel=mongoose.model('users' , userschema)


module.exports = userModel