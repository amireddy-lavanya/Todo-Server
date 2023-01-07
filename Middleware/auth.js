const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const Users = require("../Models/User");

const validateToken =(req, res , next)=>{
    const tokenAccess = req.header(token);
    if(!tokenAccess){
        return(
            res.status(400).json({
                message:"user not logged in"
            })
        )
    }
    try{
        jwt.verify(tokenAccess, process.env.JWT_KEY , async(err , decode)=>
        {
            if(err)
            {
                return res.status(400).json({
                    message:err.message
                })
            }
            const data = await Users.findOne({_id:decode.data})
            if(data){
                req.user = data._id;
                next();
            }
            
            else{
               res.json({
                message:"failed"
               })
            }
        })
    }
    catch(e){
        res.status(400).json(
            {
                message:e.message
            }
        )
    }
}

module.exports = validateToken;