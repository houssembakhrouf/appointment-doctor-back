const express=require('express')
const router=express.Router()
const userMiddleware = require('../middleware/userMiddleware')
const  {Doctordata, updateDoctordata, getDoctordatabydoctorId, getAllApppointmentsbydoctorId, changeappointmentsatus} = require('../controllers/doctorcontroolers')



router.post('/get-doctordata-byId' , userMiddleware , Doctordata)
router.post('/update-doctordata' , userMiddleware , updateDoctordata)
router.post('/get-doctordata-bydoctorId' , userMiddleware , getDoctordatabydoctorId)
router.get('/get-appointments-by-doctor-id' , userMiddleware , getAllApppointmentsbydoctorId )
router.post('/change-appointment-status' , userMiddleware , changeappointmentsatus)


module.exports = router