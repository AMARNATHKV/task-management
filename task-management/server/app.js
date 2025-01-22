const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors({origin:"http://localhost:3000",}));
const routes = require("./routes/route")
app.use(express.json());
app.use("/",routes);

const PORT=3000;

app.listen(PORT, ()=>{
    console.log(`Port is connected as ${PORT}`);
})

mongoose.connect("mongodb://localhost:27017/task-management");


const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});