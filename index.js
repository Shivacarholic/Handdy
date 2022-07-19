const express = require("express");
const app = express();

const morgan = require("morgan");
const userRouter = require(".//routers/user");
const taskRouter = require("./routers/tasks");
const mongooserequiring = require("./src/db/mongoose");

app.use(morgan("tiny"));
console.log("Morgan was enabled...");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Connecting to the port ${port}...`);
});
