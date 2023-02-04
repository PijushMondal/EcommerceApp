const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async(req,res,next) => {
    try{
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            let user = await User.findById(decoded?._id).select("-password");
            if(user){
                user = user.toObject();
                req.user = user;
                next();
            }
            else{
                res.status(401).json({
                    status : false,
                    message : "Auth failed."
                })
            }
        }
        else{
            res.status(401).json({
                status : false,
                msg : "Auth failed."
            })
        }
    }
    catch(err){
        res.status(500).json({
            status : false,
            msg : "server error."
        })
    }
};