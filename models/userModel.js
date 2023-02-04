const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true,
    },
    lastname : {
        type:String,
        required:true,
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    mobile : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    role : {
        type:String,
        default:"user"
    }
},{
    timestamps:true
});

userSchema.methods.comparePassword = async function(password){
    try{
        let result = await bcrypt.compare(password,this.password);
        return result;
    }
    catch(err){
        throw err;
    }
}

const User = mongoose.model("User",userSchema);
module.exports = User;