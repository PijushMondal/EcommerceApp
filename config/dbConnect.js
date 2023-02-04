const { mongoose } = require('mongoose');

const dbConnect = async() => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try{
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, options);
        console.log("Database Connected Successfully");
    } catch(error) {
        console.log("Database Error");
    }
};

module.exports = dbConnect;