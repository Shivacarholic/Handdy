const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    process.env.MONGODB_URL
    //      ,{
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useUnifiedTopology: true,
    //   }
  )
  .then(() => console.log("Connected too MongoDB..."))
  .catch((err) => console.error(err));

// mongoose
//   .connect("mongodb://localhost:27017/handdy")
//   .then(() => console.log("Connected too MongoDB..."))
//   .catch((err) => console.error(err));
