const express = require("express");
const cors = require("cors")
const { connection } = require("./config/db");
require("dotenv").config();
const app = express();
app.use(express.json());
const userRouter = require("./route/review.routes");

const PORT = process.env.PORT||8081;
app.use(cors());



app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to the Reeview backend" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong,try again" });
  }

})
app.use("/", userRouter);


app.listen(PORT, async () => {
  console.log("Backend Is Runing");
  try {
    await connection;
console.log("Connected to Sever At Port: ",PORT);
  } catch (error) {
    console.log(error);
    console.log("error getting to connect with data base");
  }
});
