const express = require("express");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const UserData = require("../Models/User");

const {validationResult} = require("express-validator");

const dotenv =require("dotenv");

app.use(express.json())
dotenv.config();

app.post('/register' , async(req , res)=>{
    const {email , password} = req.body;
    try{
        const error =validationResult(req);
        if(!error.isEmpty())
        {
            res.status(400).json(
                {
                    message:error.array()
                }
            )
        }

        const userAlreadyExist = await UserData.findOne({email})
        if(userAlreadyExist){
             res.status(400).json(
                {
                    error: "User already exist"
                }
             )
        }
        bcrypt.hash(password , 10 , async function(err, hash)
        {
            if(err)
            {
                return res.status(400).json({
                    message: error.message
                })
            }
            const data = await UserData.create({email , password:hash})
            res.status(200).json({
                status:"Successfull",
                message:"Registration Successfull"
            })
        }
        )
    }
    catch(e)
    {
       res.status(500).json({
         messsage: e.message
       })
    }
    

})
app.post('/login' , async(req, res)=>{
    const {email ,password} =  req.body
    const userData = await UserData.findOne({email:email})
    if(userData != null)
    {
        let result = await bcrypt.compare(password , userData.password)
        if(result)
        {
            const token = jwt.sign({exp:Math.floor(Date.now()/10)+ 60* 60 ,
             
            data:userData._id
        },
        process.env.JWT_KEY)
        res.status(200).json({
            status: "successfull",
            token:token
        })
        }
        else{
            res.status(400).json({
                status:"Failed",
                message: "incorrect password"
            })
        }
    }
    else{
        res.status(400).json({
            status:"failed",
            message:"no user found"
        })
    }
    

})
module.exports =app;