const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected succesfully');
    }
    catch(error) {
        console.log("connection fail",error.message);
        process.exit(1);
    }
};
module.exports = connectDB;