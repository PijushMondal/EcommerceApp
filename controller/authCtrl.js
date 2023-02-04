const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET_KEY;

exports.loginWithEmailPassword = async(req,res) => {
    try{
        let user = await User.findOne({email : req.body.email});
        if(user){
            let isPasswordValid = await user.comparePassword(req.body.password);
            if(isPasswordValid){
                let token = jwt.sign({_id : user._id.toString()},JWT_KEY);
                let data = user.toObject();
                delete data["password"];
                res.json({
                    status : true,
                    msg : "user loggedin successfully.",
                    token,
                    data
                })
            }
            else{
                res.json({
                    status : false,
                    msg : "invalid password"
                })
            }
        }
        else{
            res.json({
                status : false,
                msg : "email does not exist."
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
           status : false,
           msg : "server error" 
        });
    }
}