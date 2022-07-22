const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected too MongoDB..."))
  .catch((err) => console.error(err));

