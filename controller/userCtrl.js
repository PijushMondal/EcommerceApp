const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//create user
exports.createUser = async(req,res,next) => {
    try{
        let existingUser = await User.findOne({$or:[{email:req.body.email},{mobile:req.body.mobile}]});
        if(existingUser){
            res.json({
                status : false,
                msg : 'User already exists.'
            })
        }
        else{
            let securepassword = await bcrypt.hash(req.body.password,saltRounds);
            let user = new User({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                mobile : req.body.mobile,
                password : securepassword
            });
            await user.save();
            res.json({
                status : true,
                msg : 'User registered successfully.'
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            msg : 'server error.'
        })
    }
}