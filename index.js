const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const AuthApis = require('./routes/authApis');
const UserApis = require('./routes/userApis');
const PORT = process.env.PORT || 4000;

//database connection
dbConnect();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//apis
app.use(`/apis/v1`,AuthApis);
app.use(`/apis/v1`,UserApis);

//404 not found
app.use((req,res,next)=>{
    res.status(404).json({
        status : false,
        msg : 'Invalid API.'
    })
})

//server
app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
});