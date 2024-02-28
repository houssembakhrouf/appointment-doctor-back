const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require("dotenv");
const connectdb = require("./config/connect");
dotenv.config({ path: "./config/.env" });
app.use(express.json());
const port = process.env.PORT || 5000;

connectdb();
app.use(cors())
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/admin', require('./routes/adminRoute'))
app.use('/api/doctor' , require('./routes/doctorRoutes'))



app.listen(port, (err) => {
  err ? console.log(err) : console.log("server run in ", port);
});

