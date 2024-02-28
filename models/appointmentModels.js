const mongoose = require('mongoose');

const appointmentchema = mongoose.Schema({
    userId: {
        type: String,
    },
    doctorId: {
        type: String,
    },
    doctorInfo: {
        type: Object,
    },
    userInfo: {
        type: Object,
   },
    date: {
        type: String,
       default: '',
      },
      fromtime: {
        type: String,
      default: '',
      },
      totime: {
        type: String,
        default: '',
      },
   
    status: {
        type: String,
        required: true,
        default: "pending"
    },
}
    , {
        timestamps: { type: Date, immutable: true }
    })

    const appointmentModel = mongoose.model('appointment', appointmentchema)


    module.exports = appointmentModel