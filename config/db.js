const mongoose = require('mongoose')
require('dotenv').config('./.env')

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER_PASS}@cluster0.0d2ld.mongodb.net/crud`)
  .then(() => console.log(`CONNECTED TO MONGODB`))
  .catch((err) => console.log(`FAILED TO CONNECTED TO MONGODB`, err))