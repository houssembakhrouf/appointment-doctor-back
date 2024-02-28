const express=require('express')
const router=express.Router()
const userMiddleware = require('../middleware/userMiddleware')
const { getAlldoctors, getAllusers, changestatus } = require('../controllers/admincontroller')

router.get('/get-all-doctors' , userMiddleware , getAlldoctors )
router.get('/get-all-users' , userMiddleware , getAllusers )
router.post('/change-doctor-status' , userMiddleware , changestatus )








module.exports = router