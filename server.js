const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require("./routes/movie-router");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/movie",router);

mongoose.connect("mongodb+srv://movie:Movie123@cluster0.rhjnwiv.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("Connected to database"))
    .then(()=>{
    }).catch((err)=>console.log(err));
    
app.get("/",(req,res)=>{
    res.send("Working...")
})
    
app.listen(5002,(req,res)=>{
    console.log("Running on 5002");
});