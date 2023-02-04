const { validationResult } = require('express-validator');

exports.errorHandler = (req,res,next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({
                status : false,
                msg : 'invalid inputs',
                errors: errors.array().map(({msg,param})=>{
                    return{
                        msg,
                        param
                    }
                })
            })
        }
        else{
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : false,
            msg : 'server error'
        })
    }
}