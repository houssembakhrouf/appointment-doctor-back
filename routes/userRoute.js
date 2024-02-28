const express=require('express')
const router=express.Router()
const { check } = require("express-validator");
const {Register , Login  , Userdata , applyDoctor, marknotification, deletenotifications, getAllApproveddoctors, newappointment, addppointment, getAllApppointmentsbyuserId }=require('../controllers/userControleer')
const userMiddleware = require('../middleware/userMiddleware')






router.post(
    "/register",
    [
      check("email", "not a valid email").isEmail().normalizeEmail(),
      check("password", "your password should containt .. ").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      }),
    ],
    Register
  );
  router.post("/login", Login);
  router.get("/getdata",userMiddleware,Userdata);
  router.post('/apply-doctor-account',userMiddleware , applyDoctor )
  router.post('/mark-all-not-seen',userMiddleware , marknotification )
  router.post('/delete-mark-all-not-seen',userMiddleware , deletenotifications )
  router.get('/get-all-approved-doctors',userMiddleware , getAllApproveddoctors )
  router.post('/book-appointment' , userMiddleware , addppointment  )
  router.get('/get-appointments-by-user-id' , userMiddleware , getAllApppointmentsbyuserId  )



  module.exports=router

