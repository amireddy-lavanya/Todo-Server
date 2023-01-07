const express = require("express");
const app = express();
const mongoose = require("mongoose")
mongoose.set('strictQuery' ,true);
const cors = require("cors");
const dotenv =require("dotenv");
app.use(cors())
const userRoute = require("./Routes/user")
dotenv.config();

app.use(express.json());

mongoose.connect("mongodb+srv://lavanyareddy:lavanya@cluster0.cpg7tzm.mongodb.net/?retryWrites=true&w=majority" , (error, res)=>{

    if(error){
        console.log("DB not connected")
    }
    else{
        console.log("connected to db ")
    }


})

app.use('/' , userRoute);

app.listen(5000, ()=>{ console.log("Server is running on port 5000!!!")})